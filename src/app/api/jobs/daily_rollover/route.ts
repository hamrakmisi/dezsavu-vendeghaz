'use server'

import { NextResponse } from 'next/server'
import { runDailyRollover } from '@/lib/cron/dailyRollover'

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production' &&
      !(process.env.CRON_SECRET &&
        request.headers?.get('Authorization') === `Bearer ${process.env.CRON_SECRET}`)
  ) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    await runDailyRollover()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to run daily rollover:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}