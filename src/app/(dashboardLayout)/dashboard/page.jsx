// import dbConnect from "@/lib/dbConnect";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export default async function DashboardPage() {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const db = await dbConnect();

//   const recipesCollection = db.collection("recipes");
//   const usersCollection = db.collection("users");

//   const userEmail = session?.user?.email;

//   const myRecipes = await recipesCollection.countDocuments({
//     userEmail,
//   });

//   const myFavorites = await usersCollection.countDocuments({
//     favorites: {
//       $in: [userEmail],
//     },
//   });

//   const totalLikes = await recipesCollection.aggregate([
//     {
//       $match: {
//         userEmail,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         total: {
//           $sum: "$likeCount",
//         },
//       },
//     },
//   ]).toArray();

//   const likes = totalLikes[0]?.total || 0;

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold">
//           Dashboard
//         </h1>

//         <p className="text-default-500 mt-2">
//           Welcome back, {session?.user?.name}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">
//             My Recipes
//           </h2>

//           <p className="text-4xl font-bold mt-4">
//             {myRecipes}
//           </p>
//         </div>

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">
//             Favorites
//           </h2>

//           <p className="text-4xl font-bold mt-4">
//             {myFavorites}
//           </p>
//         </div>

//         <div className="border rounded-xl p-6">
//           <h2 className="text-lg font-semibold">
//             Total Likes
//           </h2>

//           <p className="text-4xl font-bold mt-4">
//             {likes}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OverviewItems from "@/components/OverviewItems";

const FREE_RECIPE_LIMIT = 2;

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const db = await dbConnect();

  const recipesCollection = db.collection("recipes");
  const usersCollection = db.collection("users");

  const userEmail = session?.user?.email;

  const currentUser = await usersCollection.findOne({ email: userEmail });
  const isPremium = Boolean(currentUser?.isPremium);

  const myRecipes = await recipesCollection.countDocuments({
    userEmail,
  });

  const myFavorites = await usersCollection.countDocuments({
    favorites: {
      $in: [userEmail],
    },
  });

  const myPurchased = await usersCollection
    .findOne({ email: userEmail })
    .then((u) => u?.purchasedRecipes?.length || 0);

  const totalLikes = await recipesCollection
    .aggregate([
      {
        $match: {
          userEmail,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$likeCount",
          },
        },
      },
    ])
    .toArray();

  const likes = totalLikes[0]?.total || 0;

  const canAddRecipe = isPremium || myRecipes < FREE_RECIPE_LIMIT;
  const slotsRemaining = isPremium
    ? null
    : Math.max(FREE_RECIPE_LIMIT - myRecipes, 0);

  return (
    <div className="space-y-8">
      <div>
         <OverviewItems /> 
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-default-500 mt-2">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">My Recipes</h2>

          <p className="text-4xl font-bold mt-4">{myRecipes}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">Favorites</h2>

          <p className="text-4xl font-bold mt-4">{myFavorites}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">Purchased</h2>

          <p className="text-4xl font-bold mt-4">{myPurchased}</p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">Total Likes</h2>

          <p className="text-4xl font-bold mt-4">{likes}</p>
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold">Recipe Allowance</h2>
            <p className="text-default-500 mt-1 text-sm">
              {isPremium
                ? "Premium member — unlimited recipes."
                : `${myRecipes} of ${FREE_RECIPE_LIMIT} free slots used.`}
            </p>
          </div>

          {!isPremium && (
            <div className="flex gap-2">
              {Array.from({ length: FREE_RECIPE_LIMIT }).map((_, i) => {
                const filled = i < myRecipes;
                return (
                  <div
                    key={i}
                    className={`w-16 h-10 rounded-md border-2 border-dashed flex items-center justify-center text-xs font-medium ${
                      filled
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-default-300 text-default-400"
                    }`}
                  >
                    {filled ? "USED" : "OPEN"}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!isPremium && !canAddRecipe && (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              You&apos;ve used both free recipe slots. Upgrade to premium to
              add unlimited recipes.
            </p>
            <a
              href="/dashboard/upgrade"
              className="inline-block mt-3 text-sm font-semibold text-amber-900 underline"
            >
              Become a premium member
            </a>
          </div>
        )}

        {canAddRecipe && (
          <a
            href="/dashboard/add-recipe"
            className="inline-block mt-4 text-sm font-semibold underline"
          >
            + Add a new recipe
            {!isPremium && slotsRemaining !== null
              ? ` (${slotsRemaining} slot${slotsRemaining === 1 ? "" : "s"} left)`
              : ""}
          </a>
        )}
      </div>
    </div>
  );
}