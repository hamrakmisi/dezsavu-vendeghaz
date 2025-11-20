'use server'

import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from "../pool";
import { BookingStatus } from "../types";

export interface Reservation {
  id?: number;
  userId?: number;
  nights: number;
  checkInDate: Date;
  checkOutDate: Date;
  statusId: number;
  discountId: number | null;
  total: number;
}

export async function insertReservation(reservation: Reservation): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(`
    INSERT INTO reservations (userId, nights, checkInDate, checkOutDate, statusId, discountId, total, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `, [
    reservation.userId,
    reservation.nights,
    reservation.checkInDate,
    reservation.checkOutDate,
    reservation.statusId,
    reservation.discountId,
    reservation.total
  ]);
  
  return result.insertId;
}

export async function getReservationsByDateRange(from: Date, to: Date): Promise<Reservation[]> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT * FROM reservations
    WHERE (
      (checkInDate <= ? AND checkOutDate >= ?)
      OR (checkInDate BETWEEN ? AND ?)
      OR (checkOutDate BETWEEN ? AND ?)
    )
    AND statusId != ?
  `, [from, to, from, to, from, to, BookingStatus.CANCELLED]);

  return rows.map((row: RowDataPacket) => ({
    id: row.id,
    userId: row.userId,
    nights: row.nights,
    checkInDate: row.checkInDate,
    checkOutDate: row.checkOutDate,
    statusId: row.statusId,
    discountId: row.discountId,
    total: row.total,
  }));
}

export async function getReservationById(id: number): Promise<Reservation> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT * FROM reservations
    WHERE id = ?
  `, [id]);
  return rows.map((row: RowDataPacket) => ({
    id: row.id,
    userId: row.userId,
    nights: row.nights,
    checkInDate: row.checkInDate,
    checkOutDate: row.checkOutDate,
    statusId: row.statusId,
    discountId: row.discountId,
    total: row.total,
  }))[0];
}

export async function updateReservationStatusById(reservationId: number, statusId: BookingStatus) {
  await pool.query<ResultSetHeader>(`
    UPDATE reservations
    SET statusId = ?, updatedAt = NOW()
    WHERE id = ?
  `, [statusId, reservationId]);
}

export async function updateReservationStatusByCheckOutDate(date: Date, statusId: BookingStatus) {
  await pool.query<ResultSetHeader>(`
    UPDATE reservations
    SET statusId = ?, updatedAt = NOW()
    WHERE checkOutDate <= ?
    AND statusId NOT IN (?, ?)
  `, [statusId, date, statusId, BookingStatus.CANCELLED]);
}


export async function deleteExpiredPendingReservations(): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(`
    DELETE FROM reservations
    WHERE statusId = ?
    AND createdAt < DATE_SUB(NOW(), INTERVAL 10 MINUTE)
  `, [BookingStatus.PENDING_PAYMENT]);
  return result.affectedRows;
}

