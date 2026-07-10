import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import DeleteReportButton from "@/components/admin/DeleteReportButton";
import DeleteRecipeButton from "@/components/admin/DeleteRecipeButton";
import MarkReviewedButton from "@/components/admin/MarkReviewedButton";

export default async function ReportsPage() {
  const db = await dbConnect();

  const reports = await db
    .collection("reports")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Review Reports
      </h1>

      <div className="overflow-x-auto bg-base-100 rounded-xl border">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Recipe</th>
              <th>Reported By</th>
              <th>Reason</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id.toString()}>
                <td>{index + 1}</td>

                <td>{report.recipeTitle}</td>

                <td>{report.reportedBy}</td>

                <td>{report.reason}</td>

                <td className="max-w-xs">
                  {report.message}
                </td>

                <td>
                  <span
                    className={`badge ${
                      report.status === "Reviewed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-2">

                    <MarkReviewedButton
                      id={report._id.toString()}
                    />

                    <DeleteRecipeButton
                      id={report.recipeId}
                    />

                    <DeleteReportButton
                      id={report._id.toString()}
                    />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}