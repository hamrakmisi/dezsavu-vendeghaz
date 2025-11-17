'use server'

import { createBooking } from '@/lib/bokingController';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await 
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Foglalás sikeresen rögzítve!',
        data: reservationId
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Hiba történt a foglalás során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}