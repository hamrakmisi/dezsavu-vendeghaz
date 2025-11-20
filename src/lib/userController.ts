'use server'

import { GuestInfo } from "@/app/booking/components/BookingSummary";
import { getUserByEmail, createUser } from "./queries/users";

export async function createOrGetUser(guestInfo: GuestInfo) {
  const normalizedGuestInfo = {
    ...guestInfo,
    email: guestInfo.email.replace(/\s+/g, ''),
    phone: guestInfo.phone.replace(/\s+/g, ''),
  };

  const user = await getUserByEmail(normalizedGuestInfo.email);

  if (user) {
    return user;
  }

  return await createUser(normalizedGuestInfo);
}
