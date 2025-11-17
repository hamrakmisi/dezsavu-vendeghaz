'use server'

import { Reservation, getReservationsByDateRange } from './queries/reservations';

interface GetReservationsParams {
  id?: number;
  from?: Date;
  to?: Date;
 }

export async function getReservations(params: GetReservationsParams): Promise<Reservation[]> {
  // if (params.id) {
  //   TODO: getby id
  // }
  
  if (params.from && params.to) {
    return getReservationsByDateRange(params.from, params.to);
  }

  return [];
}