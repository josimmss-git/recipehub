"use client";
import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import Link from "next/link";
import { FaCrown, FaStar, FaInfinity } from "react-icons/fa";

export default function PremiumPage() {

  const UpdateToPremium = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Checkout error:", data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2119] via-[#2C2A22] to-[#1B2119] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-sm font-medium px-5 py-2 rounded-full mb-4">
            <FaCrown className="text-lg" />
            EXCLUSIVE MEMBERSHIP
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Premium Kitchen
          </h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto">
            Unlock your full culinary potential with unlimited access
          </p>
        </div>

        {/* Pricing Card */}
        <div className="relative max-w-lg mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl blur-3xl opacity-20" />

          <div className="relative bg-[#F6EFDD] rounded-3xl overflow-hidden shadow-2xl border border-amber-400/30">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 text-center font-semibold tracking-wider text-sm">
              MOST POPULAR
            </div>

            <div className="p-10">
              {/* Price */}
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-light text-gray-600">$</span>
                  <span className="text-7xl font-bold text-[#211C13]">9</span>
                </div>
                <p className="text-gray-600 text-lg">per month • Cancel anytime</p>
              </div>

              {/* Features */}
              <div className="space-y-6 mb-12">
                {[
                  { icon: <FaInfinity />, label: "Unlimited Recipe Uploads" },
                  { icon: <FaStar />, label: "Premium Badge on Profile" },
                  { icon: "🔓", label: "Access to Exclusive Recipes" },
                  { icon: "✨", label: "Early Access to New Features" },
                  { icon: "📈", label: "Priority Support" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center text-2xl bg-amber-100 text-amber-700 rounded-2xl transition group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <span className="text-[#3A3628] text-lg font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <UpgradePremiumButton updateTopremium={UpdateToPremium} />

              <p className="text-center text-xs text-gray-500 mt-6">
                Secure payment powered by Stripe
              </p>
            </div>

            {/* Decorative bottom */}
            <div className="h-2 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600" />
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex justify-center gap-8 mt-12 text-sm text-gray-400">
          <div>🔒 Secure Checkout</div>
          <div>✦ Cancel Anytime</div>
          <div>⭐ 30-Day Money Back</div>
        </div>
      </div>
    </div>
  );
}