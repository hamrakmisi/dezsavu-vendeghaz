'use server'

import { NextResponse } from 'next/server';
import { login } from '../../../lib/loginController';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const result = await login(username, password);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: 'Hibás felhasználónév vagy jelszó.',
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Sikeres bejelentkezés!',
        data: result
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Hiba történt a bejelentkezés során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}
