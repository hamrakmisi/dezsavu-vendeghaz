'use server'

import { NextResponse } from 'next/server';
import { fetchAirbnbCalendar } from '@/lib/iCal';

export async function GET() {
  try {
    const events = await fetchAirbnbCalendar();

    return NextResponse.json(
      {
        success: true,
        message: 'Események sikeresen lekérve!',
        data: events
      },
      { status: 200 }
    );
    
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
