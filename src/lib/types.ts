export enum BookingStatus {
  PENDING_PAYMENT = 1,
  UPCOMING = 2,
  COMPLETED = 3,
  CANCELLED = 4
}

export enum UserRole {
  GUEST = 1,
  ADMIN = 2
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

export interface DashboardData {
  reservationCount: number;
  avgLength: number;
  medianLength: number;
  pricePerNight: number;
  returningCustomerPercentage: number;
  cancelledCount: number;
  pendingCount: number;
  completedCount: number;
}

export enum DashboardFilterType {
  THIS_MONTH = 'Ez a hónap',
  LAST_MONTH = 'Előző hónap',
  LAST_6_MONTHS = 'Előző 6 hónap',
  LAST_12_MONTHS = 'Előző 12 hónap',
  THIS_YEAR = 'Ez az év',
  ALL = 'Összes'
}