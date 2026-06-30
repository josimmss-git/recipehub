import Link from "next/link";

export default function RecentRecipes({ recipes }) {
  return (
    <div className="rounded-xl border bg-base-100 p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Recent Recipes
      </h2>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">
                  {recipe.title}
                </h3>

                <p className="text-sm text-gray-500">
                  ❤️ {recipe.likes || 0}
                </p>
              </div>

              <Link
                href={`/recipes/${recipe._id}`}
                className="btn btn-sm"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}