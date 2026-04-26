import { DashboardFilterType, BookingStatus } from "./types";
import { getReservationsByDateRange } from "./queries/dashboard";
import { getPrice } from "./queries/price";

function getFilterDate(filter: DashboardFilterType): { start: Date, end: Date } | null {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  switch (filter) {
    case DashboardFilterType.THIS_MONTH: {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      return { start, end };
    }

    case DashboardFilterType.LAST_MONTH: {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      return { start, end };
    }

    case DashboardFilterType.LAST_6_MONTHS: {
      const start = new Date(year, month - 6, 1);
      const end = now;
      return { start, end };
    }

    case DashboardFilterType.LAST_12_MONTHS: {
      const start = new Date(year, month - 12, 1);
      const end = now;
      return { start, end };
    }

    case DashboardFilterType.THIS_YEAR: {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31);
      return { start, end };
    }

    case DashboardFilterType.ALL:
    default:
      return null;
  }
}

function calculateReturningCustomerPercentage(items: { userId: number }[]): number {
  const counts = new Map<number, number>();

  for (const { userId } of items) {
    counts.set(userId, (counts.get(userId) ?? 0) + 1);
  }

  const returning = [...counts.values()].filter(c => c > 1).length;

  return counts.size === 0 ? 0 : (returning / counts.size) * 100;
}


export default async function collectDashboardData(filter: DashboardFilterType) {
  const filterDate = getFilterDate(filter);

  const [pricePerNight, reservations] = await Promise.all([
    getPrice(),
    getReservationsByDateRange(filterDate)
  ]);

  if (reservations.length === 0) {
    return {
      pricePerNight,
      data: null
    }
  }

  const reservationCount = reservations.length;
  const avgLength = reservations.reduce((acc, reservation) => acc + reservation.nights, 0) / reservationCount;
  const medianLength = reservations.sort((a, b) => a.nights - b.nights)[Math.floor(reservationCount / 2)].nights;
  const returningCustomerPercentage = calculateReturningCustomerPercentage(reservations as { userId: number }[]);
  const cancelledCount = reservations.filter(reservation => reservation.statusId === BookingStatus.CANCELLED).length;
  const pendingCount = reservations.filter(reservation => reservation.statusId === BookingStatus.UPCOMING).length;
  const completedCount = reservations.filter(reservation => reservation.statusId === BookingStatus.COMPLETED).length;

  return {
    pricePerNight,
    data: {
      reservations,
      reservationCount,
      avgLength,
      medianLength,
      returningCustomerPercentage,
      cancelledCount,
      pendingCount,
      completedCount,
    }
  }
};
