import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const db = await dbConnect();

  const recipesCollection = db.collection("recipes");
  const usersCollection = db.collection("users");

  const userEmail = session?.user?.email;

  const myRecipes = await recipesCollection.countDocuments({
    userEmail,
  });

  const myFavorites = await usersCollection.countDocuments({
    favorites: {
      $in: [userEmail],
    },
  });

  const totalLikes = await recipesCollection.aggregate([
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
  ]).toArray();

  const likes = totalLikes[0]?.total || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-default-500 mt-2">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            My Recipes
          </h2>

          <p className="text-4xl font-bold mt-4">
            {myRecipes}
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            Favorites
          </h2>

          <p className="text-4xl font-bold mt-4">
            {myFavorites}
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold">
            Total Likes
          </h2>

          <p className="text-4xl font-bold mt-4">
            {likes}
          </p>
        </div>

      </div>
    </div>
  );
}