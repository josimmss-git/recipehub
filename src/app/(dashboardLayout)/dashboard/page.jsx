// import dbConnect from "@/lib/dbConnect";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import Link from "next/link";

// const FREE_RECIPE_LIMIT = 2;

// function PremiumBadge({ size = "sm" }) {
//   const sizeClasses =
//     size === "lg"
//       ? "px-4 py-2 text-sm gap-1.5"
//       : "px-3 py-1 text-xs gap-1.5";

//   const iconSize = size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";

//   return (
//     <span
//       className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 font-bold text-white shadow-sm ${sizeClasses}`}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         fill="currentColor"
//         className={iconSize}
//       >
//         <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm0 2h14v2H5v-2z" />
//       </svg>
//       PREMIUM
//     </span>
//   );
// }

// export default async function DashboardPage() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const db = await dbConnect();
//   const recipesCollection = db.collection("recipes");
//   const usersCollection = db.collection("users");

//   const userEmail = session?.user?.email;

//   if (!userEmail) {
//     return <p className="text-center text-red-500">Please log in to view dashboard.</p>;
//   }

//   const currentUser = await usersCollection.findOne({ email: userEmail });
//   const isPremium = Boolean(currentUser?.isPremium);

//   const myRecipes = await recipesCollection.countDocuments({ userEmail });

//   const myFavorites = await usersCollection.countDocuments({
//     favorites: { $in: [userEmail] },
//   });

//   const myPurchased = currentUser?.purchasedRecipes?.length || 0;

//   const totalLikes = await recipesCollection
//     .aggregate([
//       { $match: { userEmail } },
//       { $group: { _id: null, total: { $sum: "$likeCount" } } },
//     ])
//     .toArray();

//   const likes = totalLikes[0]?.total || 0;

//   const canAddRecipe = isPremium || myRecipes < FREE_RECIPE_LIMIT;
//   const slotsRemaining = isPremium
//     ? null
//     : Math.max(FREE_RECIPE_LIMIT - myRecipes, 0);

//   return (
//     <div className="space-y-8">
//       <div>
//         <div className="flex items-center gap-3 flex-wrap">
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           {isPremium && <PremiumBadge />}
//         </div>
//         <p className="text-default-500 mt-2">
//           Welcome back, {session?.user?.name}
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">My Recipes</h2>
//           <p className="text-4xl font-bold mt-4">{myRecipes}</p>
//         </div>

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">Favorites</h2>
//           <p className="text-4xl font-bold mt-4">{myFavorites}</p>
//         </div>

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">Purchased</h2>
//           <p className="text-4xl font-bold mt-4">{myPurchased}</p>
//         </div>

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">Total Likes</h2>
//           <p className="text-4xl font-bold mt-4">{likes}</p>
//         </div>
//       </div>

//       {/* Recipe Allowance Section */}
//       <div className="border rounded-xl p-6">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <h2 className="text-lg font-semibold">Recipe Allowance</h2>
//             <p className="text-default-500 mt-1 text-sm">
//               {isPremium
//                 ? "Premium member — unlimited recipes."
//                 : `${myRecipes} of ${FREE_RECIPE_LIMIT} free slots used.`}
//             </p>
//           </div>

//           {!isPremium && (
//             <div className="flex gap-2">
//               {Array.from({ length: FREE_RECIPE_LIMIT }).map((_, i) => {
//                 const filled = i < myRecipes;
//                 return (
//                   <div
//                     key={i}
//                     className={`w-16 h-10 rounded-md border-2 border-dashed flex items-center justify-center text-xs font-medium ${
//                       filled
//                         ? "border-amber-500 bg-amber-50 text-amber-700"
//                         : "border-default-300 text-default-400"
//                     }`}
//                   >
//                     {filled ? "USED" : "OPEN"}
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {isPremium && <PremiumBadge size="lg" />}
//         </div>

//         {/* Upgrade Prompt */}
//         {!isPremium && !canAddRecipe && (
//           <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <PremiumBadge />
//             </div>
//             <p className="text-sm text-amber-800">
//               You have used both free recipe slots. Upgrade to premium to add
//               unlimited recipes.
//             </p>
//             <Link
//               href="/dashboard/premium"
//               className="inline-block mt-3 text-sm font-semibold text-amber-900 underline hover:text-amber-700"
//             >
//               Become a premium member →
//             </Link>
//           </div>
//         )}

//         {/* Add Recipe Link */}
//         {canAddRecipe && (
//           <Link
//             href="/dashboard/add-recipe"
//             className="inline-block mt-4 text-sm font-semibold underline hover:text-primary"
//           >
//             + Add a new recipe
//             {!isPremium && slotsRemaining !== null
//               ? ` (${slotsRemaining} slot${slotsRemaining === 1 ? "" : "s"} left)`
//               : ""}
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FaCrown, FaHeart, FaUtensils, FaFire, FaPlus } from "react-icons/fa";

const FREE_RECIPE_LIMIT = 2;

function PremiumBadge({ size = "sm" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-1.5 text-white font-bold shadow-md ${size === "lg" ? "text-base" : "text-xs"}`}>
      <FaCrown className={size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"} />
      PREMIUM
    </span>
  );
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const db = await dbConnect();
  const recipesCollection = db.collection("recipes");
  const usersCollection = db.collection("users");

  const userEmail = session?.user?.email;
  if (!userEmail) {
    return <p className="text-center text-red-500">Please log in to view dashboard.</p>;
  }

  const currentUser = await usersCollection.findOne({ email: userEmail });
  const isPremium = Boolean(currentUser?.isPremium);

  const myRecipes = await recipesCollection.countDocuments({ userEmail });
  const myFavorites = await usersCollection.countDocuments({ favorites: { $in: [userEmail] } });
  const myPurchased = currentUser?.purchasedRecipes?.length || 0;

  const totalLikesResult = await recipesCollection
    .aggregate([
      { $match: { userEmail } },
      { $group: { _id: null, total: { $sum: "$likeCount" } } },
    ])
    .toArray();
  const likes = totalLikesResult[0]?.total || 0;

  const canAddRecipe = isPremium || myRecipes < FREE_RECIPE_LIMIT;
  const slotsRemaining = isPremium ? null : Math.max(FREE_RECIPE_LIMIT - myRecipes, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold text-[#211C13]">Welcome back, {session?.user?.name?.split(" ")[0]}!</h1>
          <p className="text-lg text-gray-600 mt-2">Your kitchen dashboard</p>
        </div>
        {isPremium && <PremiumBadge size="lg" />}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <FaUtensils className="text-3xl text-amber-600" />
            <span className="text-xs font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">RECIPES</span>
          </div>
          <p className="text-6xl font-bold text-[#211C13]">{myRecipes}</p>
          <p className="text-gray-500 mt-1">My Recipes</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <FaHeart className="text-3xl text-rose-500" />
            <span className="text-xs font-medium text-rose-500 bg-rose-100 px-3 py-1 rounded-full">FAVORITES</span>
          </div>
          <p className="text-6xl font-bold text-[#211C13]">{myFavorites}</p>
          <p className="text-gray-500 mt-1">Saved Recipes</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <FaFire className="text-3xl text-orange-500" />
            <span className="text-xs font-medium text-orange-500 bg-orange-100 px-3 py-1 rounded-full">LIKES</span>
          </div>
          <p className="text-6xl font-bold text-[#211C13]">{likes}</p>
          <p className="text-gray-500 mt-1">Total Likes Received</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <FaCrown className="text-3xl text-amber-500" />
            <span className="text-xs font-medium text-amber-500 bg-amber-100 px-3 py-1 rounded-full">PURCHASED</span>
          </div>
          <p className="text-6xl font-bold text-[#211C13]">{myPurchased}</p>
          <p className="text-gray-500 mt-1">Premium Recipes</p>
        </div>
      </div>

      {/* Recipe Allowance Card */}
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-[#211C13]">Recipe Allowance</h2>
            <p className="text-gray-600 mt-3 text-lg">
              {isPremium 
                ? "You have unlimited recipe creations." 
                : `${myRecipes} of ${FREE_RECIPE_LIMIT} free slots used.`}
            </p>
          </div>

          {!isPremium && (
            <div className="flex gap-3">
              {Array.from({ length: FREE_RECIPE_LIMIT }).map((_, i) => {
                const isUsed = i < myRecipes;
                return (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      isUsed 
                        ? "border-amber-500 bg-amber-50" 
                        : "border-dashed border-gray-300"
                    }`}
                  >
                    <span className="text-xl font-bold">{isUsed ? "✓" : "○"}</span>
                    <span className="text-xs mt-1 font-medium">{isUsed ? "USED" : "FREE"}</span>
                  </div>
                );
              })}
            </div>
          )}

          {isPremium && <PremiumBadge size="lg" />}
        </div>

        {/* Upgrade Prompt */}
        {!isPremium && !canAddRecipe && (
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-amber-800 text-lg">
              You've reached the free limit. Upgrade to Premium for unlimited recipes and exclusive features.
            </p>
            <Link
              href="/dashboard/premium"
              className="inline-flex items-center gap-2 mt-5 bg-amber-600 hover:bg-amber-700 transition text-white font-semibold px-8 py-3 rounded-2xl"
            >
              Upgrade to Premium <FaCrown />
            </Link>
          </div>
        )}

        {/* Add Recipe Button */}
        {canAddRecipe && (
          <Link
            href="/dashboard/add-recipe"
            className="mt-8 inline-flex items-center gap-3 bg-[#211C13] hover:bg-black text-white font-semibold px-8 py-4 rounded-2xl transition active:scale-95"
          >
            <FaPlus /> Add New Recipe
            {!isPremium && slotsRemaining !== null && (
              <span className="text-amber-400">({slotsRemaining} left)</span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}