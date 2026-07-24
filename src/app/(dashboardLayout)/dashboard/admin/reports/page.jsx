import dbConnect from "@/lib/dbConnect";

import MarkReviewedButton from "@/components/dashboard/admin/MarkReviewedButton";
import DeleteRecipeButton from "@/components/dashboard/admin/DeleteRecipeButton";

export default async function ReportsPage() {
  const db = await dbConnect();

  const reports = await db
    .collection("reports")
    .find({ status: "pending" }) // Filter pending reports
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Recipe Reports <span className="text-3xl">🚩</span>
          </h1>
          <p className="text-base-content/60 mt-1">
            {reports.length} pending reports
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-base-200 p-1 rounded-xl">
          <button className="btn btn-sm btn-primary rounded-xl px-6">Pending</button>
          <button className="btn btn-sm btn-ghost px-6">Dismissed</button>
          <button className="btn btn-sm btn-ghost px-6">All</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 rounded-2xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Recipe ID</th>
                <th>Reporter</th>
                <th>Reason</th>
                <th>Description</th>
                <th>Reported</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id.toString()} className="hover:bg-base-200/50">
                  <td className="font-mono text-sm">
                    {report.recipeId?.toString().slice(0, 8)}...
                  </td>

                  <td>
                    <div className="font-medium">{report.reporterName || report.email}</div>
                    {report.email && (
                      <div className="text-xs text-base-content/60">{report.email}</div>
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        report.reason?.toLowerCase().includes("offensive")
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {report.reason}
                    </span>
                  </td>

                  <td className="max-w-md truncate">
                    {report.message || report.description || "—"}
                  </td>

                  <td className="text-sm opacity-70">
                    {new Date(report.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <DeleteRecipeButton
                        _id={report.recipeId}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Remove Recipe
                      </DeleteRecipeButton>

                      <MarkReviewedButton
                        id={report._id.toString()}
                        className="btn btn-sm btn-ghost"
                      >
                        Dismiss
                      </MarkReviewedButton>
                    </div>
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-base-content/60">
                    No pending reports found.
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