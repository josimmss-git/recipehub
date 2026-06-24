import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";

export default async function MyRecipesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const db = await dbConnect();

  const recipes = await db
    .collection("recipes")
    .find({
      authorEmail: session?.user?.email,
    })
    .toArray();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        My Recipes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="bg-slate-900 p-4 rounded-xl"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="text-xl font-bold mt-4">
              {recipe.title}
            </h2>

            <p className="text-slate-400">
              {recipe.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}