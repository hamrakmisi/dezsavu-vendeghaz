'use server'

import { NextResponse } from 'next/server'
import { runCleanup } from '@/lib/cron/cleanup'

export async function GET(request: Request) {
  if (process.env.NODE_ENV === 'production' &&
      !(process.env.CRON_SECRET &&
        request.headers?.get('Authorization') === `Bearer ${process.env.CRON_SECRET}`)
  ) {
    return new Response('Unauthorized', { status: 401 })
  }

  const result = await runCleanup()
  return NextResponse.json(result)
}