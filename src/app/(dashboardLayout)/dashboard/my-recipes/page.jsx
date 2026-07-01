import { getMyRecipes } from "@/lib/api/recipes/action";
import DeleteRecipeButton from "@/components/dashboard/DeleteRecipeButton";
import Image from "next/image";

export default async function MyRecipesPage() {
  const recipes = await getMyRecipes();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Recipes</h1>

      {recipes.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-gray-500">You haven't added any recipes yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="table w-full p-6">
            <thead>
              <tr className="text-3xl font-bold">
                <th>Image</th>
                <th>Title</th>
                <th>Cuisine</th>
                <th>Category</th>
                <th>Likes</th>
                  <th>Created</th>
                  <th>Actions</th>
              </tr>
            </thead>
<tbody>
  {recipes.map((recipe) => (
    <tr key={recipe._id.toString()}>
      <td>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-14 w-14 rounded object-cover"
        />
      </td>

      <td className="text-2xl font-bold text-cyan-400">{recipe.title}</td>

      <td>{recipe.cuisine}</td>

      <td className="text-2xl font-bold text-cyan-400">{recipe.categories}</td>

      <td>{recipe.likeCount || 0}</td>

      <td>{new Date(recipe.createdAt).toLocaleDateString()}</td>

      <td>
        <DeleteRecipeButton id={recipe._id.toString()} />
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