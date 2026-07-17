import { getAllRecipes } from "@/lib/api/recipes/action";
import Link from "next/link";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel";


export default async function RecipesPage({ searchParams }) {
  // ✅ Await the promise and destructure all params
  const { search = "", category = "All Categories", cuisine = "All Cuisines", difficulty = "All Difficulties", sort = "Newest" } = await searchParams;

  let recipes = [];
  try {
    // Pass all filters to the data layer
    recipes = await getAllRecipes({ search, category, cuisine, difficulty, sort });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Browse Recipes</h1>
        <p className="text-gray-500 mt-2">
          Discover delicious recipes shared by our community.
        </p>
      </div>

      {/* Filter Panel */}
      <div className="mb-10">
        <FilterPanel />
      </div>

      {/* Recipe Count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {recipes.length} Recipes Found
        </h2>
      </div>

      {/* Recipe Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="group overflow-hidden rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.jpg"}
                alt={recipe.title}
                width={500}
                height={300}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold line-clamp-1">
                {recipe.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary">{recipe.category}</span>
                <span className="badge badge-secondary">{recipe.cuisine}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>❤️ {recipe.likeCount || 0} Likes</span>
                <span>{recipe.preparationTime} min</span>
              </div>
              <Link
                href={`/browse-recipe/${recipe._id}`}
                className="btn btn-warning w-full"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}