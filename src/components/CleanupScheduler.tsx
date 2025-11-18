'use client'

import { useEffect } from 'react'

export default function CleanupScheduler() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('/api/cleanup')
          const result = await response.json()
          console.log('Cleanup result:', result)
        } catch (error) {
          console.error('Failed to run cleanup:', error)
        }
      }, 5 * 60 * 1000)

      fetch('/api/cleanup').catch(console.error)

      return () => clearInterval(interval)
    }
  }, [])

  return null
}