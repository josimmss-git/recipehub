import BlockUserButton from "@/components/dashboard/admin/BlockUserButton";
import DeleteUserButton from "@/components/dashboard/admin/DeleteUserButton";
import RoleButton from "@/components/dashboard/admin/RoleButton";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";

import {
  FaSearch,
  FaTrash,
  FaCheckCircle,
  FaUserSlash,
  FaUserCheck,
  FaCrown,
} from "react-icons/fa";

export default async function UsersPage() {

  const currentUser = await getCurrentUser();
  const db = await dbConnect();

  const users = await db.collection("user").find({}).toArray();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold">Manage Users</h1>
          <p className="text-base-content/60 mt-2">
            View and manage all registered users.
          </p>
        </div>

        <div className="stats shadow border">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-base-100 border rounded-2xl shadow p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full pl-12"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-100 rounded-2xl border shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table flex items-center justify-between w-full">
            <thead className="bg-base-200 border-b">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Premium</th>
                <th>Status</th>
              
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id.toString()}
                  className="hover:bg-base-200"
                >
                  {/* User */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-12">
                          <span>
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold">
                          {user.name}
                        </div>

                        <div className="text-sm opacity-60">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-primary">
                        Admin
                      </span>
                    ) : (
                      <span className="badge badge-outline">
                        User
                      </span>
                    )}
                  </td>

                  {/* Premium */}
                  <td>
                    {user.isPremium ? (
                      <span className="badge badge-warning gap-1">
                        <FaCrown />
                        Premium
                      </span>
                    ) : (
                      <span className="badge badge-ghost">
                        Free
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    {user.isBlocked ? (
                      <span className="badge badge-error">
                        Blocked
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        Active
                      </span>
                    )}
                  </td>

                  {/* Verified */}
                  {/* <td>
                    {user.emailVerified ? (
                      <span className="text-success flex items-center gap-2">
                        <FaCheckCircle />
                        Verified
                      </span>
                    ) : (
                      <span className="text-warning">
                        Pending
                      </span>
                    )}
                  </td> */}

                  {/* Actions */}
                 <td>
   <div className="flex justify-center gap-2">

     {currentUser?._id !== user._id.toString() && (
    <RoleButton
    id={user._id.toString()}
    role={user.role}
                        />
                        

                      )}
                      
    
                      {user.isBlocked ? (
      <button className="btn btn-sm btn-success">
        <FaUserCheck />
        Unblock
      </button>
    ) : (
      <BlockUserButton
        id={user._id.toString()}
      />
    )}

    <DeleteUserButton id={user._id.toString()} />

  </div>
</td>
                </tr>

              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10"
                  >
                    No users found.
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