'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool";
import { AdminUser } from '../types';

export async function getAdminUserByUsername(username: string): Promise<AdminUser | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT * FROM admin WHERE username = ?
  `,
  [username]
  );

  return rows[0] as AdminUser;
}