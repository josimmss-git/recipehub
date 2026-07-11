import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/dbConnect";
import { Button } from "@heroui/react";

export default async function PopularRecipes() {
  const db = await dbConnect();

  const recipes = await db
    .collection("recipes")
    .find({})
    .sort({ likes: -1 })
    .limit(6)
    .toArray();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Recipes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id.toString()}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg duration-300"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {recipe.title}
                </h3>

                <p className="mt-2">
                  ❤️ {recipe.likeCount || 0} Likes
                </p>

                <p className="text-gray-500 mt-1">
                  By {recipe.userName}
                </p>

                <Link
                  href={`/browse-recipe/${recipe._id.toString()}`}
                  className="btn btn-primary w-full mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link href="/browse-recipe" className="text-3xl font-bold text-center mb-10 mx-auto block mt-10">
         <Button> See More Recipes</Button>
        </Link>
      </div>
    </section>
  );
}