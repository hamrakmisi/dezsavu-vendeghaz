'use server'

import { createBooking } from '@/lib/bokingController';
import { NextResponse } from 'next/server';
import { getReservations } from '@/lib/reservationController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const reservationId = await createBooking(body)
    
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const id = searchParams.get('id');


    const reservations = await getReservations({
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      id: id ? Number(id) : undefined
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Foglalás(ok) sikeresen lekérve!',
        data: reservations
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing booking:', error);
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
