import { getAllMyRecipes } from "@/lib/api/recipes/action";
import DeleteRecipeButton from "@/components/dashboard/DeleteRecipeButton";
import Link from "next/link";

export default async function MyRecipesPage() {
  const recipes = await getAllMyRecipes();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Recipes</h1>
          <p className="mt-1 text-sm text-gray-500">
            {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} in your collection
          </p>
        </div>

        <Link href="/dashboard/add-recipe" className="btn btn-primary">
          + Add Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-gray-50 p-16 text-center">
          <span className="mb-4 text-5xl">🍳</span>
          <p className="text-lg font-medium text-gray-700">No recipes yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Start building your collection by adding your first recipe.
          </p>
          <Link href="/dashboard/add-recipe" className="btn btn-primary btn-sm mt-6">
            Add your first recipe
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border shadow-sm">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="py-3">Recipe</th>
                <th>Cuisine</th>
                <th>Category</th>
                <th>Likes</th>
                <th>Created</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {recipes.map((recipe) => (
                <tr
                  key={recipe._id.toString()}
                  className="transition-colors"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                      />
                      <span className="font-semibold text-gray-400">
                        {recipe.title}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {recipe.cuisine}
                    </span>
                  </td>

                  <td>
                    <span className="badge badge-outline badge-sm">
                      {recipe.categories}
                    </span>
                  </td>

                  <td>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <span className="text-red-400">♥</span>
                      <span>{recipe.likeCount || 0}</span>
                    </div>
                  </td>

                  <td className="text-gray-500">
                    {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td>
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/dashboard/update-recipe/${recipe._id}`}
                        className="btn btn-sm btn-ghost"
                      >
                        ✏️ Edit
                      </Link>

                      <DeleteRecipeButton id={recipe._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
