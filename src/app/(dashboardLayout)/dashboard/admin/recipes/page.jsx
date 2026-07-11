import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import DeleteRecipeButton from "@/components/dashboard/admin/DeleteRecipeButton";
import { FaSearch, FaEdit, FaHeart } from "react-icons/fa";
import Link from "next/link";

export default async function ManageRecipesPage() {
  const currentUser = await getCurrentUser();

  const db = await dbConnect();

  const recipes = await db
    .collection("recipes")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Recipes
          </h1>

          <p className="text-base-content/60 mt-2">
            View, edit and delete recipes.
          </p>
        </div>

        <div className="stats shadow border">
          <div className="stat">
            <div className="stat-title">
              Total Recipes
            </div>

            <div className="stat-value text-primary">
              {recipes.length}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-base-100 border rounded-2xl shadow p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search recipes..."
            className="input input-bordered w-full pl-12"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 rounded-2xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Recipe</th>
                <th>Category</th>
                <th>Cuisine</th>
                <th>Author</th>
                <th>Likes</th>
                <th className="text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id.toString()}>
                  {/* Recipe */}
                  <td>
                    <div className="flex items-center gap-4">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {recipe.title}
                        </h3>

                        <p className="text-sm opacity-60">
                          {recipe.difficulty}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td>{recipe.category}</td>

                  {/* Cuisine */}
                  <td>{recipe.cuisine}</td>

                  {/* Author */}
                  <td>{recipe.userName}</td>

                  {/* Likes */}
                  <td>
                    <span className="badge badge-primary gap-2">
                      <FaHeart />
                      {recipe.likeCount || 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/dashboard/admin/recipes/${recipe._id}`}
                        className="btn btn-sm btn-warning"
                      >
                        <FaEdit />
                      </Link>

                      <DeleteRecipeButton
                        id={recipe._id.toString()}
                      />

                    </div>
                  </td>
                </tr>
              ))}

              {recipes.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10"
                  >
                    No recipes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}