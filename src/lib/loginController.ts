import argon2 from 'argon2';
import { getAdminUserByUsername } from './queries/admin';
import { sessionOptions, SessionData } from "@/lib/session";
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { AdminUser } from './types';

//here for later purpose
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return await argon2.verify(hash, password);
}

async function createSession(user: AdminUser) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.user = { id: user.id.toString(), userName: user.username };
  session.isLoggedIn = true;
  await session.save();
}

export async function login(username: string, password: string): Promise<boolean> {
  const user = await getAdminUserByUsername(username);
  if (!user) {
    return false;
  }

  const isValid = await verifyPassword(user.password_hash, password);
  if (!isValid) {
    return false;
  }

  await createSession(user);
  return true;
}
