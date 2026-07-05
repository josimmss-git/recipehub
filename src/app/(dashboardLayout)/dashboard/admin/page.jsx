import dbConnect from "@/lib/dbConnect";

export default async function AdminOverview() {
  const db = await dbConnect();

  const users = await db.collection("users").countDocuments();
  const recipes = await db.collection("recipes").countDocuments();
  const reports = await db.collection("reports").countDocuments();
  const premiumUsers = await db.collection("users").countDocuments({ isPremium: true });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded text-black">👥 Users: {users}</div>
        <div className="bg-white p-4 shadow rounded text-black">🍲 Recipes: {recipes}</div>
        <div className="bg-white p-4 shadow rounded text-black">⭐ Premium: {premiumUsers}</div>
        <div className="bg-white p-4 shadow rounded text-black">🚨 Reports: {reports}</div>
      </div>
    </div>
  );
}