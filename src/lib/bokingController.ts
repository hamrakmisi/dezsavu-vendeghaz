'use server'

import { insertReservation } from "./queries/reservations";
import { GuestInfo } from "@/app/booking/components/BookingSummary";
import { createOrGetUser } from "./userController";
import { calculateTotalPrice, calculateNights } from "./helper";
import { BookingStatus } from "./types";

export interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  guestInfo: GuestInfo;
}

export async function createBooking(bookingData: BookingData) {
  const user = await createOrGetUser(bookingData.guestInfo);

  const nights = calculateNights(new Date(bookingData.checkInDate), new Date(bookingData.checkOutDate));
  const { totalPrice } = calculateTotalPrice(nights);

  await insertReservation({
    userId: user.id,
    nights,
    checkInDate: new Date(bookingData.checkInDate),
    checkOutDate: new Date(bookingData.checkOutDate),
    statusId: BookingStatus.PENDING_PAYMENT,
    discountId: null,//TODO: discounts
    total: totalPrice
  })
}
