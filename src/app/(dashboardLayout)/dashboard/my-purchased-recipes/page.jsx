import Link from "next/link";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Button } from "@heroui/react";

export default async function MyPurchasedRecipesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Please login first.
        </h2>
      </div>
    );
  }

  const db = await dbConnect();

  const purchases = await db
    .collection("purchases")
    .find({
      userEmail: user.email,
    })
    .toArray();

  const recipes = await Promise.all(
    purchases.map(async (purchase) => {
      return await db.collection("recipes").findOne({
        _id: new ObjectId(purchase.recipeId),
      });
    })
  );

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">
        My Purchased Recipes
      </h1>

      {recipes.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No purchased recipes found.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map(
            (recipe) =>
              recipe && (
                <div
                  key={recipe._id.toString()}
                  className="card bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-56 w-full object-cover"
                    />
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title">
                      {recipe.title}
                    </h2>

                    <p>
                      <strong>Category:</strong>{" "}
                      {recipe.category}
                    </p>

                    <p>
                      <strong>Author:</strong>{" "}
                      {recipe.userName}
                    </p>

                    <div className="card-actions justify-end">
                      <Link
                        href={`/recipes/${recipe._id}`}
                        className="btn btn-primary"
                      >
                      <Button className="btn btn-primary">
                        View Recipe
                      </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </section>
  );
}