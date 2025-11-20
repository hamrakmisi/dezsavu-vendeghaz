'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool";

export async function getDiscountByCode(code: string) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT value FROM discounts where code = ? and validFrom <= NOW() and validTo >= NOW()
  `,
  [code]
  );

  return rows[0];
}

export async function getDiscountIdByValue(value: number) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT id FROM discounts where value = ? and validFrom <= NOW() and validTo >= NOW()
  `,
  [value]
  );

  return rows[0].id;
}