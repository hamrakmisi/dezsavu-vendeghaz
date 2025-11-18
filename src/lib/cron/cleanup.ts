import { deleteExpiredPendingReservations } from '@/lib/queries/reservations'

export async function runCleanup() {
  try {
    const deletedCount = await deleteExpiredPendingReservations()
    console.log(`[Cleanup] Deleted ${deletedCount} expired pending reservations`)
    return { success: true, deletedCount }
  } catch (error) {
    console.error('[Cleanup] Failed to clean up expired reservations:', error)
    return { success: false, error: String(error) }
  }
}