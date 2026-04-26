'use server'

import { NextResponse } from 'next/server';
import { updatePrice } from '@/lib/queries/price';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price } = body;

    if (!price) {
      return NextResponse.json(
        {
          success: false,
          message: 'Ár megadása kötelező.',
        },
        { status: 401 }
      );
    }

    const result = await updatePrice(price);

    return NextResponse.json(
      {
        success: true,
        message: 'Sikeresen módosult az ár!',
        data: result
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing price change:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Hiba történt az ár módosítása során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}
