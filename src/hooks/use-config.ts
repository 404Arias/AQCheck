"use client"

import { useState, useEffect } from 'react'

interface Config {
  paypalClientId: string
  paypalSecret: string
  googleAnalyticsId: string
  paymentsEnabled: boolean
  freeResultsEnabled: boolean
  headScripts: string
  bodyScripts: string
}

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config')
        const data = await response.json()
        
        setConfig({
          paypalClientId: data.paypalClientId || '',
          paypalSecret: data.paypalSecret || '',
          googleAnalyticsId: data.googleAnalyticsId || '',
          paymentsEnabled: data.paymentsEnabled !== 'false',
          freeResultsEnabled: data.freeResultsEnabled === 'true',
          headScripts: data.headScripts || '',
          bodyScripts: data.bodyScripts || ''
        })
      } catch (error) {
        console.error('Error fetching config:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return { config, loading }
}