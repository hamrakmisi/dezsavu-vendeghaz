'use server'

import { NextResponse } from 'next/server';
import { getPrice } from '@/lib/queries/price';

export async function GET(request: Request) {
  try {
    const price = await getPrice();

    return NextResponse.json(
      {
        success: true,
        message: 'Ár sikeresen lekérve!',
        data: price
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing price:', error);
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
