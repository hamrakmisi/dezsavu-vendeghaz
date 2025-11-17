'use client'

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { fetchClientSecret } from '../app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ reservationId }: { reservationId: number }) {
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#EEF5DB',
      colorText: '#1f2937',
      // Add more theme variables as needed
    },
    rules: {
      '.Tab': {
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.03)',
      },
      // Add more custom rules
    }
  };
  return (
    <div id="checkout" className="w-[95%] mx-auto pt-32">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          fetchClientSecret: () => fetchClientSecret(reservationId),
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}