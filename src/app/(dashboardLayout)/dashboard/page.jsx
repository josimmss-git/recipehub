"use client";

import {
  FaUtensils,
  FaHeart,
  FaEye,
  FaBookmark,
  FaCrown,
} from "react-icons/fa";
import { Button } from "@heroui/react";
import DashBoardHeading from "@/components/DashBoardHeading";

const OverviewItems = () => {
  const stats = {
    totalRecipes: 12,
    totalFavorites: 34,
    totalViews: 1250,
    savedRecipes: 18,
  };

  const isPremium = false;

  return (
    <div className="space-y-6 mt-6">
      {/* Stats */}
      <DashBoardHeading title="Overview" description="Dashboard Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              My Recipes
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              {stats.totalRecipes}
            </h2>
          </div>

          <div className="p-3.5 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
            <FaUtensils size={24} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Favorites
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              {stats.totalFavorites}
            </h2>
          </div>

          <div className="p-3.5 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
            <FaHeart size={24} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Views
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              {stats.totalViews}
            </h2>
          </div>

          <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
            <FaEye size={24} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Saved Recipes
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              {stats.savedRecipes}
            </h2>
          </div>

          <div className="p-3.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
            <FaBookmark size={24} />
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      {!isPremium && (
        <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                Unlock Premium Recipes
              </h3>

              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Upgrade to Premium Membership and access exclusive recipes,
                advanced cooking guides, premium content, and ad-free browsing.
              </p>
            </div>

            <Button
              className="bg-yellow-500 text-slate-950 font-bold"
              radius="lg"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      {/* Recent Recipes */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          Recent Recipes
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-800 pb-3">
            <span>Chicken Biryani</span>
            <span className="text-slate-400">120 Views</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-3">
            <span>Beef Curry</span>
            <span className="text-slate-400">85 Views</span>
          </div>

          <div className="flex justify-between">
            <span>Vegetable Fried Rice</span>
            <span className="text-slate-400">62 Views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewItems;