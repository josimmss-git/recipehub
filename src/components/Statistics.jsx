"use client";

export default function Statistics({ stats }) {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-900/10 via-indigo-900/10 to-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            RecipeHub Community
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
            Join thousands of food lovers sharing recipes, discovering new
            flavors, and building a vibrant culinary community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Total Recipes */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-300">
            <span className="block text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
              {(stats?.totalRecipes ?? 0).toLocaleString()}+
            </span>
            <p className="mt-3 text-slate-300 font-semibold text-sm uppercase tracking-wider">
              Recipes Published
            </p>
          </div>

          {/* Total Users */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-300">
            <span className="block text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
              {(stats?.totalUser ?? 0).toLocaleString()}+
            </span>
            <p className="mt-3 text-slate-300 font-semibold text-sm uppercase tracking-wider">
              Active Food Lovers
            </p>
          </div>

          {/* Premium Users */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-pink-500/30 transition-all duration-300">
            <span className="block text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
              {(stats?.totalPremiumUser ?? 0).toLocaleString()}+
            </span>
            <p className="mt-3 text-slate-300 font-semibold text-sm uppercase tracking-wider">
              Premium Members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}