"use client"

import { useEffect } from 'react'
import { useConfig } from '@/hooks/use-config'

interface CustomScriptsProps {
  children: React.ReactNode
}

export function CustomScripts({ children }: CustomScriptsProps) {
  const { config, loading } = useConfig()

  useEffect(() => {
    if (loading || !config) return

    // Inject head scripts
    if (config.headScripts) {
      const headScripts = document.createElement('div')
      headScripts.innerHTML = config.headScripts
      const scripts = headScripts.getElementsByTagName('script')
      
      Array.from(scripts).forEach(script => {
        const newScript = document.createElement('script')
        newScript.text = script.text
        newScript.async = script.async
        
        // Copy attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value)
        })
        
        document.head.appendChild(newScript)
      })

      // Add non-script elements (like noscript)
      Array.from(headScripts.children).forEach(child => {
        if (child.tagName !== 'SCRIPT') {
          document.head.appendChild(child.cloneNode(true))
        }
      })
    }

    // Inject body scripts
    if (config.bodyScripts) {
      const bodyScripts = document.createElement('div')
      bodyScripts.innerHTML = config.bodyScripts
      const scripts = bodyScripts.getElementsByTagName('script')
      
      Array.from(scripts).forEach(script => {
        const newScript = document.createElement('script')
        newScript.text = script.text
        newScript.async = script.async
        
        // Copy attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value)
        })
        
        document.body.appendChild(newScript)
      })

      // Add non-script elements
      Array.from(bodyScripts.children).forEach(child => {
        if (child.tagName !== 'SCRIPT') {
          document.body.appendChild(child.cloneNode(true))
        }
      })
    }
  }, [config, loading])

  return <>{children}</>
}