"use client";

import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What Our Food Lovers Say
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-3">
          Discover how RecipeHub helps home cooks, food bloggers, and culinary
          enthusiasts share recipes, gain inspiration, and connect with a
          growing community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Testimonial 1 */}
        <div className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300 p-8 rounded-2xl space-y-6 hover:-translate-y-1">
          <p className="text-slate-300 italic leading-relaxed">
            "RecipeHub completely changed the way I share my home-cooked meals.
            I can upload recipes, get feedback, and connect with thousands of
            food lovers. It feels like a real cooking community!"
          </p>

          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt="Food Blogger"
              width={56}
              height={56}
              className="rounded-full w-14 h-14 object-cover"
            />

            <div>
              <h4 className="text-white font-bold">Emily Carter</h4>
              <p className="text-pink-500 text-sm">Home Food Blogger</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300 p-8 rounded-2xl space-y-6 hover:-translate-y-1">
          <p className="text-slate-300 italic leading-relaxed">
            "As a premium member, I love the unlimited recipe uploads and
            exclusive cooking ideas. The UI is clean, fast, and perfect for
            discovering new dishes every day."
          </p>

          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              alt="Chef Profile"
              width={56}
              height={56}
              className="rounded-full w-14 h-14 object-cover"
            />

            <div>
              <h4 className="text-white font-bold">Michael Johnson</h4>
              <p className="text-pink-500 text-sm">Premium Member</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Highlight */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-6 py-3">
          <span className="text-pink-400 font-semibold">
            Loved by thousands of home chefs worldwide 🍽️
          </span>
        </div>
      </div>
    </section>
  );
}