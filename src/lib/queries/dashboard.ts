'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool";

interface DateRange {
  start: Date;
  end: Date;
}

function handleFilterDate(filterDate: DateRange | null) {
  if (filterDate === null) {
    return '';
  }

  return 'AND checkInDate >= ? AND checkInDate <= ?'
}


export async function getReservationsByDateRange(filterDate: DateRange | null) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT * FROM reservations WHERE statusId != 1 ${handleFilterDate(filterDate)}
  `,
    filterDate ? [filterDate.start, filterDate.end] : []
  );

  return rows;
}