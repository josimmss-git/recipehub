import MarkReviewedButton from "@/components/dashboard/admin/MarkReviewedButton";
import DeleteRecipeButton from "@/components/dashboard/DeleteRecipeButton";
import dbConnect from "@/lib/dbConnect";
import { Card, CardHeader, Chip, Avatar } from "@heroui/react";

export default async function ReportsPage() {
  const db = await dbConnect();

  const reports = await db
    .collection("reports")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="space-y-8">
      {/* Header */}
     <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold tracking-tight">
      Review Reports
    </h1>

    <p className="text-default-500 mt-1">
      Review reported recipes and moderate platform activities.
    </p>
  </div>

  <Chip
    color="primary"
    variant="shadow"
    size="lg"
    className="font-semibold"
  >
    {reports.length} Reports
  </Chip>
</div>

      {reports.length === 0 ? (
        <Card>
          <div className="py-16 text-center">
            <h2 className="text-2xl font-semibold">No Reports Found</h2>
            <p className="text-default-500 mt-2">
              Great! There are no reports to review.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6">
          {reports.map((report, index) => (
            <Card
              key={report._id.toString()}
              shadow="sm"
              className="border border-default-200"
            >
              <CardHeader className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    radius="lg"
                    size="lg"
                    src={
                      report.recipeImage ||
                      "https://placehold.co/80x80"
                    }
                  />

                  <div>
                    <h2 className="font-bold text-lg">
                      {report.recipeTitle}
                    </h2>

                    <p className="text-default-500 text-sm">
                      Report #{index + 1}
                    </p>
                  </div>
                </div>

                <Chip
                  color={
                    report.status === "Reviewed"
                      ? "success"
                      : "warning"
                  }
                  variant="flat"
                >
                  {report.status}
                </Chip>
              </CardHeader>

              <div>
                <div className="grid md:grid-cols-2 gap-6">

                  <div className="space-y-3">

                    <div>
                      <p className="text-sm text-whiite-500 mb-1">
                        Reported By
                      </p>

                      <p className="font-medium text-white-900">
                        {report.reporName}
                      </p>

                      {report.email && (
                        <p className="text-sm text-default-500">
                          {report.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-default-500">
                        Reason
                      </p>

                      <Chip
                        color="danger"
                        variant="flat"
                        size="sm"
                      >
                        {report.reason}
                      </Chip>
                    </div>

                  </div>

                  <div>
                    <p className="text-sm text-default-500 mb-2">
                      Message
                    </p>

                    <div className="rounded-xl bg-default-100 p-4 text-sm">
                      {report.message || "No message provided."}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <MarkReviewedButton
                    id={report._id.toString()}
                  />

                  <DeleteRecipeButton
                    id={report.recipeId}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}