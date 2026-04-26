'use server'

import { NextResponse } from 'next/server';
import collectDashboardData from '../../../lib/dashboardController';
import { DashboardFilterType } from '../../../lib/types';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter');

    if (!filter || !Object.values(DashboardFilterType).includes(filter as DashboardFilterType)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Hibás szűrési paraméterek.',
        },
        { status: 401 }
      );
    }

    const result = await collectDashboardData(filter as DashboardFilterType);


    return NextResponse.json(
      {
        success: true,
        message: 'Sikeresen betöltöttük az adatokat!',
        data: result
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing login:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Hiba történt az adatok betöltése során.',
        error: error instanceof Error ? error.message : 'Ismeretlen hiba'
      },
      { status: 500 }
    );
  }
}
