'use server'

import { insertReservation } from "./queries/reservations";
import { GuestInfo } from "@/app/booking/components/BookingSummary";
import { createOrGetUser } from "./userController";
import { calculateTotalPrice, calculateNights } from "./helper";
import { BookingStatus } from "./types";
import { getPrice } from "./queries/price";
import { getDiscountIdByValue } from "./queries/discounts";

export interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  discount: number | null;
  guestInfo: GuestInfo;
}

export async function createBooking(bookingData: BookingData) {
  const user = await createOrGetUser(bookingData.guestInfo);

  const nights = calculateNights(new Date(bookingData.checkInDate), new Date(bookingData.checkOutDate));
  const pricePerNight = await getPrice();
  const { finalPrice } = calculateTotalPrice(nights, pricePerNight, bookingData.discount);
  let discountId = null;

  if (bookingData.discount) {
    discountId = await getDiscountIdByValue(bookingData.discount);
  }

  if (!finalPrice) {
    throw new Error('Final price is null');
  }

  await insertReservation({
    userId: user.id,
    nights,
    checkInDate: new Date(bookingData.checkInDate),
    checkOutDate: new Date(bookingData.checkOutDate),
    statusId: BookingStatus.PENDING_PAYMENT,
    discountId: discountId,
    total: finalPrice
  })
}
