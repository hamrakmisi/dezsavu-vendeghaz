'use server'

import { NextResponse } from 'next/server';
import { getDiscountByCode } from '@/lib/queries/discounts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      throw new Error('No code provided.');
    }

    const discount = await getDiscountByCode(code);

    if (!discount) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nem található érvényes kedvezmény ezzel a kóddal.',
          error: 'Nem található a kód.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Kedvezmény sikeresen lekérve!',
        data: discount.value
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing discount:', error);
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
