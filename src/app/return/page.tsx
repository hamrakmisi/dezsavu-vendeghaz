'use server'
import { redirect } from 'next/navigation'

import { stripe } from '../../lib/stripe'
import Button from '@/components/Button';
import { updateReservationStatus } from '@/lib/queries/reservations';
import { BookingStatus } from '@/lib/types';

export default async function Return({ searchParams }: { searchParams: any }) {
  const { session_id, reservationId } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const customerEmail = customer_details?.email || 'No email provided';

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    await updateReservationStatus(Number(reservationId), BookingStatus.UPCOMING)
    return (
      <section id="success" className="w-[95%] h-[calc(100vh-20vh)] mx-auto pt-64 flex flex-col items-center gap-4">
        <p className="text-center">
          Köszönjük hogy minket választott! A foglalásod megerősítését nemsokára a(z){' '}
          {customerEmail} email címre küldjük. Ha bármilyen kérdésed van, kérlek keress minket{' '}
          <a href="mailto:vendeghaz.dezsavu@gmail.com">vendeghaz.dezsavu@gmail.com</a>-on.
        </p>
        <Button
          text="Vissza a főoldalra"
          variant="primary"
          href="/"
        />
      </section>
    )
  }
}