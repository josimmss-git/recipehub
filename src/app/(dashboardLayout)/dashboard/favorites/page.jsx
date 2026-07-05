import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import RemoveFavoriteButton from "@/components/recipes/RemoveFavoriteButton";
import { Button } from "@heroui/react";

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
      <h1 className="text-3xl font-bold mb-8">Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p>No favorite recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item._id.toString()} className="card bg-base-100 shadow-xl">
              <figure className="relative h-52 w-full">
                <Image
                  src={item.recipeImage}
                  alt={item.recipeTitle}
                  fill
                  className="object-cover"
                />
               
              </figure>
             

              <div className="card-body">
                <h2 className="card-title">{item.recipeTitle}</h2>

                <div className="card-actions justify-between items-center">
                  <Link href={`/recipes/${item.recipeId}`} passHref legacyBehavior>
                    <Button as="a" className="btn btn-primary">
                      View Recipe
                    </Button>
                  </Link>

                  <RemoveFavoriteButton favoriteId={item._id.toString()} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
