'use server'

import { Reservation, getReservationsByDateRange, getReservationById, checkReservation } from './queries/reservations';

interface GetReservationsParams {
  id?: number;
  from?: Date;
  to?: Date;
 }

export async function getReservations(params: GetReservationsParams): Promise<Reservation[] | Reservation> {
  if (params.from && params.to) {
    return getReservationsByDateRange(params.from, params.to);
  }

  if (params.id) {
    return getReservationById(params.id);
  }

  return [];
}

export async function getFutureReservations(): Promise<Reservation[]> {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const future = new Date(new Date(new Date().setFullYear(new Date().getFullYear() + 2)).setHours(0, 0, 0, 0));
  return getReservationsByDateRange(today, future);
}

export async function checkAvailability(checkInDate: Date, checkOutDate: Date): Promise<boolean> {
  return checkReservation(checkInDate, checkOutDate);
}