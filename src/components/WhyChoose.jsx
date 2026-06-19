"use client";

import { FaAward, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function WhyChoose() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Why Choose RecipeHub
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm mt-3">
          Discover, save, and cook delicious recipes from around the world with a modern and easy-to-use cooking platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="glass p-8 rounded-2xl hover:border-pink-500/30 transition duration-300 group">
          <div className="bg-pink-500/10 text-pink-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaAward size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Top Rated Recipes
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Explore carefully curated and highly rated recipes from chefs and home cooks worldwide.
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass p-8 rounded-2xl hover:border-indigo-500/30 transition duration-300 group">
          <div className="bg-indigo-500/10 text-indigo-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaShieldAlt size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Safe & Trusted Content
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            All recipes are reviewed and organized to ensure safe cooking instructions and reliable ingredients.
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass p-8 rounded-2xl hover:border-purple-500/30 transition duration-300 group">
          <div className="bg-purple-500/10 text-purple-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
            <FaUsers size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Community Driven
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Share your own recipes, follow other cooks, and grow together in a global food community.
          </p>
        </div>

      </div>
    </section>
  );
}