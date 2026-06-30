export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-default-500 mt-2">
          Welcome to your RecipeHub Dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-6 shadow-sm">
          <h3 className="text-default-500">Total Recipes</h3>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h3 className="text-default-500">Favorites</h3>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h3 className="text-default-500">Total Likes</h3>
          <p className="mt-3 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-xl border p-6 shadow-sm">
          <h3 className="text-default-500">Premium</h3>
          <p className="mt-3 text-2xl font-bold text-warning">
            Free User
          </p>
        </div>
      </div>

      {/* Recent Recipes */}
      <div className="rounded-xl border p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">
          Recent Recipes
        </h2>

        <p className="text-default-500">
          No recipes added yet.
        </p>
      </div>
    </div>
  );
}