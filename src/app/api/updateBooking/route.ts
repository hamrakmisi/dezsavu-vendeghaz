'use server'

import { updateReservationStatus } from '@/lib/queries/reservations';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await updateReservationStatus(body.id, body.statusId);
    
    return NextResponse.json(
      { 
        success: true,
        message: 'Foglalás sikeresen frissítve!',
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Hiba történt a frissítés során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}