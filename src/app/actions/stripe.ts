'use server'

import { headers } from 'next/headers'
import { stripe } from '../../lib/stripe'
import { getReservationById } from '../../lib/queries/reservations'

export async function fetchClientSecret(reservationId: number): Promise<string> {
  const origin = (await headers()).get('origin')

  const reservation = await getReservationById(reservationId)

  const price = await stripe.prices.create({
    unit_amount: reservation.total*100,
    currency: 'huf',
    product_data: {
      name: `
        ${reservation.checkInDate.toLocaleDateString('hu-HU')}
        -
        ${reservation.checkOutDate.toLocaleDateString('hu-HU')}
      `,
    },
  });

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price: price.id,
        quantity: 1
      }
    ],
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    locale: 'hu'
  })

  return session.client_secret as string
}