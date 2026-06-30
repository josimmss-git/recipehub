import { getMyRecipes } from "@/lib/api/recipes/action";

export default async function MyRecipesPage() {
  const recipes = await getMyRecipes();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        My Recipes
      </h1>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Likes</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{recipe.likes || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}