"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = useSession();

  const isPremium = session?.user?.isPremium;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>

        <p className="text-gray-400">
          {isPremium
            ? "You are a Premium Member ⭐ Enjoy exclusive features"
            : "Upgrade to Premium to unlock more features"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#121a2b] rounded-xl">
          Total Recipes: 12
        </div>

        <div className="p-4 bg-[#121a2b] rounded-xl">
          Likes: 45
        </div>

        <div className="p-4 bg-[#121a2b] rounded-xl">
          Saved: 10
        </div>
      </div>

      {/* Premium Section */}
      {isPremium ? (
        <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl">
          ⭐ Premium Features Unlocked:
          <ul className="list-disc ml-6 mt-2">
            <li>Unlimited Recipe Upload</li>
            <li>Priority Visibility</li>
            <li>Ad-Free Experience</li>
          </ul>
        </div>
      ) : (
        <div className="p-6 bg-[#1a2236] rounded-xl">
          🔒 Premium Required:
          <ul className="list-disc ml-6 mt-2 text-gray-300">
            <li>Unlimited Recipe Upload</li>
            <li>Featured Listings</li>
            <li>Advanced Analytics</li>
          </ul>

          <button className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded">
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );
}