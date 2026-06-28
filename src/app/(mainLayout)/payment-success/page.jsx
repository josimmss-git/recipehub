import Link from "next/link";
import { Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { FaArrowRight, FaCheckCircle, FaCrown } from "react-icons/fa";

import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";

export default async function PaymentSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid Stripe session.");
  }

  // Get Stripe Checkout Session
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  // Data for backend
  const paymentData = {
    amount: Number(session?.metadata?.amount),
    transactionId: session?.payment_intent?.id,
    paymentStatus: session?.payment_status,
    paymentType: "premium",
  };

  // Upgrade user to premium
  await fetch(
    `${baseURL}/api/users/premium/${session?.customer_email}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
      cache: "no-store",
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c16] px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,.15),transparent_60%)]" />

      <Card className="relative w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">

        <CardHeader className="flex flex-col items-center gap-4 py-8">

          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <FaCheckCircle className="text-green-400 text-5xl" />
          </div>

          <h1 className="text-4xl font-extrabold text-white">
            Payment Successful 🎉
          </h1>

          <p className="text-slate-400 text-center max-w-md">
            Congratulations! Your RecipeHub Premium Membership has been activated successfully.
          </p>

        </CardHeader>

        <div className="space-y-4 px-8">        <div className="space-y-5 px-8 pb-6">

          <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-5 space-y-4">

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Premium Status</span>

              <span className="flex items-center gap-2 text-yellow-400 font-semibold">
                <FaCrown />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Email</span>

              <span className="text-white font-medium">
                {session?.customer_email}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Amount Paid</span>

              <span className="text-green-400 font-bold">
                ${paymentData.amount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Payment Status
              </span>

              <span className="capitalize text-green-400 font-semibold">
                {session?.payment_status}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-slate-400">
                Transaction ID
              </p>

              <div className="rounded-xl bg-slate-950 border border-white/10 p-3 break-all text-sm text-indigo-400">
                {session?.payment_intent?.id}
              </div>
            </div>

          </div>

          <div className="rounded-xl bg-gradient-to-r from-pink-500/10 to-violet-600/10 border border-pink-500/20 p-4">

            <h3 className="text-white font-bold mb-2">
              🎉 Premium Benefits Unlocked
            </h3>

            <ul className="space-y-2 text-sm text-slate-300">

              <li>✅ Unlimited recipe publishing</li>

              <li>✅ Premium badge on your profile</li>

              <li>✅ Priority community support</li>

              <li>✅ Access to exclusive RecipeHub features</li>

            </ul>

          </div>

        </div>

        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pb-8">

          <Link href="/dashboard">

            <Button
              radius="lg"
              className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold"
              endContent={<FaArrowRight />}
            >
              Go to Dashboard
            </Button>

          </Link>

          <Link href="/browse-recipe">

            <Button
              radius="lg"
              variant="bordered"
              className="border-white/10 text-white"
            >
              Browse Recipes
            </Button>

          </Link>

        </CardFooter>

      </Card>
    </div>
  );
}
    