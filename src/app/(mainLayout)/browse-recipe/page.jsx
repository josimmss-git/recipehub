import { getAllRecipes } from "@/lib/api/recipes/action";
import Link from "next/link";
import Image from "next/image";


export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Recipes</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={500}
              height={300}
              className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">
                {recipe.title}
              </h2>

              <p>
                <strong>Category:</strong> {recipe.category}
              </p>

              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>

              <p>
                ❤️ {recipe.likeCount || 0} Likes
              </p>

  <Link
  href={`/browse-recipe/${recipe._id.toString()}`}
  className="btn btn-primary w-full"
>
  View Details
</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}