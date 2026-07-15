// "use client";

// import { useMemo, useState } from "react";

// import BlockUserButton from "@/components/dashboard/admin/BlockUserButton";
// import UnblockUserButton from "@/components/dashboard/admin/UnblockUserButton";
// import DeleteUserButton from "@/components/dashboard/admin/DeleteUserButton";
// import RoleButton from "@/components/dashboard/admin/RoleButton";

// import {
//   FaSearch,
//   FaFire,
//   FaUserShield,
//   FaUser,
//   FaCheckCircle,
//   FaBan,
// } from "react-icons/fa";

// function formatDate(value) {
//   if (!value) return "—";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "—";

//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }

// function RoleBadge({ role }) {
//   if (role === "admin") {
//     return (
//       <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1">
//         <FaUserShield className="text-[11px]" />
//         Admin
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1">
//       <FaUser className="text-[11px]" />
//       User
//     </span>
//   );
// }

// function PremiumBadge({ isPremium }) {
//   if (!isPremium) {
//     return <span className="text-gray-400 text-sm">Free</span>;
//   }
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
//       <FaFire className="text-orange-500 text-[11px]" />
//       Premium
//     </span>
//   );
// }

// function StatusBadge({ isBlocked }) {
//   if (isBlocked) {
//     return (
//       <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
//         <FaBan className="text-[11px]" />
//         Blocked
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
//       <FaCheckCircle className="text-[11px]" />
//       Active
//     </span>
//   );
// }

// export default function UsersTable({ users, currentUserId }) {
//   const [query, setQuery] = useState("");

//   const filteredUsers = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return users;

//     return users.filter((user) => {
//       const name = user.name?.toLowerCase() ?? "";
//       const email = user.email?.toLowerCase() ?? "";
//       return name.includes(q) || email.includes(q);
//     });
//   }, [users, query]);

//   return (
//     <>
//       {/* Search */}
//       <div className="mb-5">
//         <label className="flex items-center gap-3 w-full max-w-xs rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-gray-200">
//           <FaSearch className="text-gray-400 text-sm" />
//           <input
//             type="text"
//             className="grow bg-transparent outline-none text-sm placeholder:text-gray-400"
//             placeholder="Search users..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </label>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-gray-400 text-xs uppercase tracking-wide">
//                 <th className="py-4 px-6 text-left font-medium">User</th>
//                 <th className="py-4 text-left font-medium">Role</th>
//                 <th className="py-4 text-left font-medium">Premium</th>
//                 <th className="py-4 text-left font-medium">Status</th>
//                 <th className="py-4 text-left font-medium">Joined</th>
//                 <th className="py-4 text-center font-medium">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-50">
//               {filteredUsers.map((rowUser) => (
//                 <tr
//                   key={rowUser._id}
//                   className="hover:bg-gray-50/70 transition-colors"
//                 >
//                   {/* User */}
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-gray-100">
//                         {rowUser.image ? (
//                           <img
//                             src={rowUser.image}
//                             alt={rowUser.name || "User avatar"}
//                             className="w-11 h-11 object-cover"
//                           />
//                         ) : (
//                           <span className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
//                             {rowUser.name?.charAt(0).toUpperCase() || "U"}
//                           </span>
//                         )}
//                       </div>

//                       <div>
//                         <div className="font-semibold text-gray-900">
//                           {rowUser.name}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {rowUser.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Role */}
//                   <td>
//                     <RoleBadge role={rowUser.role} />
//                   </td>

//                   {/* Premium */}
//                   <td>
//                     <PremiumBadge isPremium={rowUser.isPremium} />
//                   </td>

//                   {/* Status */}
//                   <td>
//                     <StatusBadge isBlocked={rowUser.isBlocked} />
//                   </td>

//                   {/* Joined */}
//                   <td className="text-gray-500">
//                     {formatDate(rowUser.createdAt)}
//                   </td>

//                   {/* Actions */}
//                   <td>
//                     <div className="flex flex-nowrap justify-center items-center gap-2 whitespace-nowrap">
//                       {currentUserId !== rowUser._id && (
//                         <>
//                           <RoleButton id={rowUser._id} role={rowUser.role} />

//                           {rowUser.isBlocked ? (
//                             <UnblockUserButton id={rowUser._id} />
//                           ) : (
//                             <BlockUserButton id={rowUser._id} />
//                           )}

//                           <DeleteUserButton id={rowUser._id} />
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {filteredUsers.length === 0 && (
//                 <tr>
//                   <td colSpan={6} className="text-center py-16">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="text-6xl">👥</div>
//                       <h2 className="text-2xl font-bold text-gray-800">
//                         {users.length === 0 ? "No Users Found" : "No Matches"}
//                       </h2>
//                       <p className="text-gray-400">
//                         {users.length === 0
//                           ? "There are no registered users yet."
//                           : "No users match your search."}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { useMemo, useState } from "react";

import BlockUserButton from "@/components/dashboard/admin/BlockUserButton";
import UnblockUserButton from "@/components/dashboard/admin/UnblockUserButton";
import DeleteUserButton from "@/components/dashboard/admin/DeleteUserButton";
import RoleButton from "@/components/dashboard/admin/RoleButton";

import {
  FaSearch,
  FaFire,
  FaUserShield,
  FaUser,
  FaCheckCircle,
  FaBan,
} from "react-icons/fa";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function RoleBadge({ role }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold px-3 py-1">
        <FaUserShield className="text-[11px]" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1">
      <FaUser className="text-[11px]" />
      User
    </span>
  );
}

function PremiumBadge({ isPremium }) {
  if (!isPremium) {
    return <span className="text-gray-400 text-sm">Free</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
      <FaFire className="text-orange-500 text-[11px]" />
      Premium
    </span>
  );
}

function StatusBadge({ isBlocked }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
        <FaBan className="text-[11px]" />
        Blocked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
      <FaCheckCircle className="text-[11px]" />
      Active
    </span>
  );
}

export default function UsersTable({ users, currentUserId }) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) => {
      const name = user.name?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";
      return name.includes(q) || email.includes(q);
    });
  }, [users, query]);

  return (
    <>
      {/* Search */}
      <div className="mb-5">
        <label className="flex items-center gap-3 w-full max-w-xs rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-gray-200">
          <FaSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            className="grow bg-transparent outline-none text-sm placeholder:text-gray-400"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wide">
                <th className="py-4 px-6 text-left font-medium">User</th>
                <th className="py-4 text-left font-medium">Role</th>
                <th className="py-4 text-left font-medium">Premium</th>
                <th className="py-4 text-left font-medium">Status</th>
                <th className="py-4 text-left font-medium">Joined</th>
                <th className="py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((rowUser) => (
                <tr
                  key={rowUser._id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* User */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 bg-gray-100">
                        {rowUser.image ? (
                          <img
                            src={rowUser.image}
                            alt={rowUser.name || "User avatar"}
                            className="w-11 h-11 object-cover"
                          />
                        ) : (
                          <span className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                            {rowUser.name?.charAt(0).toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-900">
                          {rowUser.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {rowUser.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td>
                    <RoleBadge role={rowUser.role} />
                  </td>

                  {/* Premium */}
                  <td>
                    <PremiumBadge isPremium={rowUser.isPremium} />
                  </td>

                  {/* Status */}
                  <td>
                    <StatusBadge isBlocked={rowUser.isBlocked} />
                  </td>

                  {/* Joined */}
                  <td className="text-gray-500">
                    {formatDate(rowUser.createdAt)}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex flex-nowrap justify-center items-center gap-2 whitespace-nowrap bg-red-500 rounded-lg px-2 py-1.5">
                      {currentUserId !== rowUser._id && (
                        <>
                          <RoleButton id={rowUser._id} role={rowUser.role} />

                          {rowUser.isBlocked ? (
                            <UnblockUserButton id={rowUser._id} />
                          ) : (
                            <BlockUserButton id={rowUser._id} />
                          )}

                          <DeleteUserButton id={rowUser._id} />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-6xl">👥</div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {users.length === 0 ? "No Users Found" : "No Matches"}
                      </h2>
                      <p className="text-gray-400">
                        {users.length === 0
                          ? "There are no registered users yet."
                          : "No users match your search."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
