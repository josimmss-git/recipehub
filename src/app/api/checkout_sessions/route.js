import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const PRICE_ID="price_1Tvh4e8BieT84II8k3j0iKkV"


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price:PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard/premium/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log(session);

    // রিডাইরেক্ট না করে, JSON হিসেবে url রিটার্ন করুন
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}