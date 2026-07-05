import dbConnect from "@/lib/dbConnect";

export default async function AdminRecipes() {
  const db = await dbConnect();

  const recipes = await db.collection("recipes").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Recipes</h1>

      <div className="grid gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{recipe.recipeName}</h2>
            <p className="text-sm text-gray-500">{recipe.category}</p>

            <div className="mt-2 flex gap-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>

              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Feature
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}