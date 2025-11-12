'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool";

export async function getDiscountByCode(code: string) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT value FROM discounts where code = ?
  `,
  [code]
  );

  return rows[0];
}

export async function getDiscountIdByValue(value: number) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT id FROM discounts where value = ?
  `,
  [value]
  );

  return rows[0].id;
}