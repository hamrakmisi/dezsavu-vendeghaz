'use server'

import { GuestInfo } from "@/app/booking/components/BookingSummary";
import { getUserByEmail, createUser } from "./queries/users";

export async function createOrGetUser(guestInfo: GuestInfo) {
  const user = await getUserByEmail(guestInfo.email);

  if (user) return user;

  return await createUser(guestInfo);
}
