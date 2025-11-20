'use server'

import { NextResponse } from 'next/server';
import { createICalFile } from '@/lib/iCal';

export async function GET() {
  try {
    const ics = await createICalFile();

    return new Response(ics, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": "attachment; filename=calendar.ics"
      }
    });
  } catch (error) {
    console.error('Error processing events:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Hiba történt a kérés során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}
