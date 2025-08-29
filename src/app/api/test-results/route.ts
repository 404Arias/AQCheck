import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testType, answers, score, result } = body

    // Create test result
    const testResult = await db.testResult.create({
      data: {
        testType,
        answers,
        score,
        result,
        userId: null // Anonymous user
      }
    })

    return NextResponse.json({ 
      success: true, 
      testResultId: testResult.id 
    })
  } catch (error) {
    console.error('Error saving test result:', error)
    return NextResponse.json(
      { error: 'Failed to save test result' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testType = searchParams.get('type')

    const where = testType ? { testType } : {}

    const testResults = await db.testResult.findMany({
      where,
      include: {
        payment: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(testResults)
  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch test results' },
      { status: 500 }
    )
  }
}