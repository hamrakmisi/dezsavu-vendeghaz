'use server'

import { RowDataPacket } from 'mysql2';
import pool from "../pool"
import { GuestInfo } from "@/app/booking/components/BookingSummary"

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<(RowDataPacket)[]>('SELECT * FROM users WHERE email = ?', [email]);
  const user = Array.isArray(rows) ? rows[0] : null;
  
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
}

export async function createUser(guestInfo: GuestInfo): Promise<User> {
  const [result] = await pool.query<{ insertId: number } & RowDataPacket[]>(`
    INSERT INTO users (email, name, phone, roleId, createdAt, updatedAt) 
    VALUES (?, ?, ?, 1, NOW(), NOW())
  `, [guestInfo.email, guestInfo.name, guestInfo.phone]);

  return {
    id: result.insertId,
    email: guestInfo.email,
    name: guestInfo.name,
    phone: guestInfo.phone,
  };
}