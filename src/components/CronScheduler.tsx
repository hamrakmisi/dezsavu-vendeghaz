'use client'

import { useEffect } from 'react'

export default function CronScheduler() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const cleanupInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/jobs/cleanup')
          const result = await response.json()
          console.log('Cleanup result:', result)
        } catch (error) {
          console.error('Failed to run cleanup:', error)
        }
      }, 5 * 60 * 1000)

      const rolloverInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/jobs/daily_rollover')
          const result = await response.json()
          console.log('Rollover result:', result)
        } catch (error) {
          console.error('Failed to run rollover:', error)
        }
      }, 24 * 60 * 60 * 1000)

      fetch('/api/jobs/cleanup').catch(console.error)
      fetch('/api/jobs/daily_rollover').catch(console.error)

      return () => {
        clearInterval(cleanupInterval)
        clearInterval(rolloverInterval)
      }
    }
  }, [])

  return null
}