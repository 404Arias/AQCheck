import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const configs = await db.config.findMany()
    
    // Convert to key-value object
    const configObj = configs.reduce((acc, config) => {
      acc[config.key] = config.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(configObj)
  } catch (error) {
    console.error('Error fetching config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch config' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body

    // Handle boolean values for settings
    let processedValue = value
    if (key === 'paymentsEnabled' || key === 'freeResultsEnabled') {
      processedValue = value.toString()
    }

    // Update or create config
    const config = await db.config.upsert({
      where: { key },
      update: { value: processedValue, updatedAt: new Date() },
      create: { key, value: processedValue }
    })

    return NextResponse.json({ 
      success: true, 
      config 
    })
  } catch (error) {
    console.error('Error updating config:', error)
    return NextResponse.json(
      { error: 'Failed to update config' },
      { status: 500 }
    )
  }
}