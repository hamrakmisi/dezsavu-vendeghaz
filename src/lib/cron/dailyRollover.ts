import { updateReservationStatusByCheckOutDate } from "../queries/reservations";
import { BookingStatus } from "../types";

export async function runDailyRollover() {
  try {
    const today = new Date(new Date().setHours(0, 0, 0, 0));

    await updateReservationStatusByCheckOutDate(today, BookingStatus.UPCOMING);
  } catch (error) {
    throw new Error('Failed to run daily rollover', { cause: error });
  }
}
