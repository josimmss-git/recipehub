import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import RemoveFavoriteButton from "@/components/recipes/RemoveFavoriteButton";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <h2>Please login first.</h2>;
  }

  const db = await dbConnect();

  const favorites = await db
    .collection("favorites")
    .find({
      userEmail: user.email,
    })
    .toArray();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <p>No favorite recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item._id.toString()}
              className="card bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={item.recipeImage}
                  alt={item.recipeTitle}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {item.recipeTitle}
                </h2>

                <div className="card-actions justify-between">
                  <Link
                    href={`/recipes/${item.recipeId}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>

                  <RemoveFavoriteButton
              favoriteId={item._id.toString()}
/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}