'use server'

import { Reservation, getReservationsByDateRange } from './queries/reservations';
import { toLocalISOString } from './helper';

interface GetReservationsParams {
  id?: number;
  from?: Date;
  to?: Date;
 }

export async function getReservations(params: GetReservationsParams): Promise<Reservation[]> {
  if (params.from && params.to) {
    return getReservationsByDateRange(params.from, params.to);
  }

  return [];
}

export async function getFutureReservations(): Promise<Reservation[]> {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const future = new Date(new Date(new Date().setFullYear(new Date().getFullYear() + 2)).setHours(0, 0, 0, 0));
  return getReservationsByDateRange(today, future);
}