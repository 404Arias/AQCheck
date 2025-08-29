import { NextRequest, NextResponse } from 'next/server'

// Config functionality simplified for free version
export async function GET(request: NextRequest) {
  return NextResponse.json({
    freeResultsEnabled: 'true',
    paymentsEnabled: 'false'
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Config updates disabled in free version' },
    { status: 403 }
  )
}