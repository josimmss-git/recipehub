"use client";

import { Card, CardBody, Button } from "@heroui/react";
import {
  FaBookOpen,
  FaHeart,
  FaDollarSign,
  FaCrown,
  FaPlusCircle,
} from "react-icons/fa";

const RecipeOverviewItems = () => {
  const stats = {
    totalRecipes: 15,
    totalLikes: 450,
    totalEarnings: 250, // premium + purchases
    totalFavorites: 780,
  };

  const isPremium = false;

  return (
    <div className="space-y-6 mt-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Recipes */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                Total Recipes
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalRecipes}
              </h2>
            </div>

            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20">
              <FaBookOpen size={24} />
            </div>
          </div>
        </Card>

        {/* Total Likes */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                Total Likes
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalLikes}
              </h2>
            </div>

            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaHeart size={24} />
            </div>
          </div>
        </Card>

        {/* Total Earnings */}
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                Total Earnings
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                ${stats.totalEarnings.toFixed(2)}
              </h2>
            </div>

            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>

      </div>

      {/* Premium Banner */}
      {!isPremium && (
        <Card
          className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                Unlock Unlimited Recipe Posting
              </h3>

              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Free users can only add <strong>2 recipes</strong>. Upgrade to Premium to unlock unlimited recipe posting, premium badge, and monetization features.
              </p>
            </div>

            <Button
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold h-11 px-6"
              radius="lg"
            >
              Upgrade to Premium
            </Button>

          </div>
        </Card>
      )}
    </div>
  );
};

export default RecipeOverviewItems;