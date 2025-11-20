'use server'

import { GuestInfo } from "@/app/booking/components/BookingSummary";
import { getUserByEmail, createUser, updateUserById } from "./queries/users";

export async function createOrGetUser(guestInfo: GuestInfo) {
  const normalizedGuestInfo = {
    ...guestInfo,
    email: guestInfo.email.replace(/\s+/g, ''),
    phone: guestInfo.phone.replace(/\s+/g, ''),
  };

  const user = await getUserByEmail(normalizedGuestInfo.email);

  if (user && user.name === normalizedGuestInfo.name && user.phone === normalizedGuestInfo.phone) {
    return user;
  }

  if (user && (user.name !== normalizedGuestInfo.name || user.phone !== normalizedGuestInfo.phone)) {
    return await updateUserById(user.id, normalizedGuestInfo);
  }

  return await createUser(normalizedGuestInfo);
}
