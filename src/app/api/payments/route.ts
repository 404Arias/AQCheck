import { NextRequest, NextResponse } from 'next/server'

// Payment functionality temporarily disabled
// This endpoint is kept for future premium features

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Payment functionality is currently disabled - all downloads are free' },
    { status: 404 }
  )
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: 'Payment functionality is currently disabled' },
    { status: 404 }
  )
}