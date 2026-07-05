import dbConnect from "@/lib/dbConnect";

export default async function ReportsPage() {
  const db = await dbConnect();

  const reports = await db.collection("reports").find({}).toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {reports.map((r) => (
        <div key={r._id} className="bg-white p-4 rounded shadow mb-3">
          <p>Recipe ID: {r.recipeId}</p>
          <p>Reason: {r.reason}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}