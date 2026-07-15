import UserTable from "@/components/dashboard/admin/UserTable";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";



export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-error">Access Denied</h1>
      </div>
    );
  }

  const db = await dbConnect();

  const rawUsers = await db
    .collection("user")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // Convert Mongo documents (ObjectId, Date) into plain, serializable data
  // before passing them from a Server Component to a Client Component.
  const users = rawUsers.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
  }));

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Manage Users <span className="text-2xl">👥</span>
        </h1>
        <p className="text-gray-400 mt-1">
          Block/unblock users and manage roles
        </p>
      </div>

      <UserTable users={users} currentUserId={currentUser.id.toString()} />
    </div>
  );
}