import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover', // Using the expected API version
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Build line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'huf',  // Hungarian Forint
        product_data: {
          name: item.name,
        },
        unit_amount: item.price, // amount in HUF (no decimals, e.g., 1000 = 1000 HUF)
      },
      quantity: item.quantity,
    }));

    const origin = request.headers.get('origin') || '';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      locale: 'hu', // Hungarian
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
