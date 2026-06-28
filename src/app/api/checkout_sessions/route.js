import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '../../../lib/stripe';
import { getUser } from '@/lib/api/session';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const body = await req.json();
    const { type } = body;

    // console.log(body);

    const user = await getUser();
    // const paymentData = {
    //     type: "booking",
    //     totalAmount,
    //     eventId,
    //     eventTitle,
    //     quantity,
    //   }
    let lineObj;
    let metaObj = {};

    if (type == 'subscription') {
      lineObj = {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1TgpUbKExS1h0fIImDNtiaU2',
        quantity: 1,
      };
    } else {
      lineObj = {
        price_data: {
          currency: 'usd',
          unit_amount: body?.ticketPrice * 100,
          product_data: {
            name: body?.eventTitle,
          },
        },
        quantity: body?.quantity,
      };
      //   console.log(user?.email, user?.id, body?.eventId, type, body?.eventTitle, body?.ticketPrice);

      metaObj = {
        email: user?.email || '',
        userId: user?.id || '',
        eventId: body?.eventId || '',
        paymentType: type,
        eventTitle: body?.eventTitle || '',
        amount: parseFloat(body?.ticketPrice).toFixed(2) * body?.quantity,
        quantity: body?.quantity,
      };
      //   console.log(user, type, 'from 54');
    }

    const successUrl =
      type == 'subscription'
        ? `${origin}/dashboard/organizer/premium-success?session_id={CHECKOUT_SESSION_ID}`
        : `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [lineObj],
      metadata: metaObj,
      mode: type === 'subscription' ? 'subscription' : 'payment',
      success_url: successUrl,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    // console.log(session);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // console.log(err);

    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}
