'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool";

export async function getPrice() {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT value FROM price where id = 1
  `
  );

  return rows[0].value;
}