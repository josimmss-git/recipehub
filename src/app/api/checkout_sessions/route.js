// utils.js — no "use client", but imported BY a client component
import { stripe } from "@/lib/stripe";
export function formatPrice(cents) { ... }  // client component only needs this
export async function createSession() { ... stripe... }  // but this drags stripe in too


export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1TuFg880OgyLrccqnfBlVDD5',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}