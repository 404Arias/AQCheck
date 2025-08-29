import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testResultId, amount, paymentMethod, transactionId } = body

    // Create payment record
    const payment = await db.payment.create({
      data: {
        testResultId,
        amount,
        currency: 'USD',
        paymentMethod,
        transactionId,
        status: 'COMPLETED'
      }
    })

    // Update test result with payment reference
    await db.testResult.update({
      where: { id: testResultId },
      data: { paymentId: payment.id }
    })

    return NextResponse.json({ 
      success: true, 
      paymentId: payment.id 
    })
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const payments = await db.payment.findMany({
      include: {
        testResult: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}