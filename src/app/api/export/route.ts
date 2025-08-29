import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, format } = body

    let data: any[] = []
    let filename = ''

    switch (type) {
      case 'test-results':
        const testResults = await db.testResult.findMany({
          include: {
            payment: true,
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        
        data = testResults.map(result => ({
          id: result.id,
          testType: result.testType,
          score: result.score,
          result: result.result,
          answers: JSON.stringify(result.answers),
          createdAt: result.createdAt,
          paymentStatus: result.payment?.status || 'PENDING',
          paymentAmount: result.payment?.amount || 0
        }))
        
        filename = `test-results-${new Date().toISOString().split('T')[0]}.${format}`
        break

      case 'payments':
        const payments = await db.payment.findMany({
          include: {
            testResult: true,
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        
        data = payments.map(payment => ({
          id: payment.id,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          transactionId: payment.transactionId,
          createdAt: payment.createdAt,
          testType: payment.testResult?.testType,
          testScore: payment.testResult?.score
        }))
        
        filename = `payments-${new Date().toISOString().split('T')[0]}.${format}`
        break

      case 'stats':
        // Get aggregated statistics
        const totalTests = await db.testResult.count()
        const totalPayments = await db.payment.count({
          where: { status: 'COMPLETED' }
        })
        const totalRevenue = await db.payment.aggregate({
          where: { status: 'COMPLETED' },
          _sum: { amount: true }
        })
        
        const aq10Count = await db.testResult.count({
          where: { testType: 'AQ10' }
        })
        
        const aq50Count = await db.testResult.count({
          where: { testType: 'AQ50' }
        })

        data = [{
          totalTests,
          totalPayments,
          totalRevenue: totalRevenue._sum.amount || 0,
          aq10Count,
          aq50Count,
          exportDate: new Date().toISOString()
        }]
        
        filename = `statistics-${new Date().toISOString().split('T')[0]}.${format}`
        break

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    // Generate content based on format
    let content: string
    let contentType: string

    if (format === 'csv') {
      if (data.length === 0) {
        content = ''
      } else {
        const headers = Object.keys(data[0])
        const csvRows = [
          headers.join(','),
          ...data.map(row => 
            headers.map(header => {
              const value = row[header]
              // Escape quotes and wrap in quotes if contains comma or quote
              if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`
              }
              return value
            }).join(',')
          )
        ]
        content = csvRows.join('\n')
      }
      contentType = 'text/csv'
    } else if (format === 'excel') {
      // For Excel, we'll return CSV format that can be opened in Excel
      // In a real implementation, you might use a library like exceljs
      if (data.length === 0) {
        content = ''
      } else {
        const headers = Object.keys(data[0])
        const csvRows = [
          headers.join('\t'),
          ...data.map(row => 
            headers.map(header => {
              const value = row[header]
              if (typeof value === 'string' && (value.includes('\t') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`
              }
              return value
            }).join('\t')
          )
        ]
        content = csvRows.join('\n')
      }
      contentType = 'application/vnd.ms-excel'
    } else {
      return NextResponse.json(
        { error: 'Invalid format' },
        { status: 400 }
      )
    }

    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}