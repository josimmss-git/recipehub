import { redirect } from "next/navigation";
import { FaCamera, FaCrown, FaUserEdit } from "react-icons/fa";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your RecipeHub account.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative">
            <img
              src={
                user.image ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name || "User")
              }
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-700"
            />

            <button
              disabled
              className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full"
            >
              <FaCamera />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              {user.name}
            </h2>

            <p className="text-slate-400 mt-2">
              {user.email}
            </p>

            <div className="mt-4">
              <span className="bg-slate-800 text-slate-300 text-sm px-3 py-1 rounded-full">
                Free Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <FaUserEdit />
          <h3 className="text-xl font-semibold text-white">
            Account Information
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-slate-400">
              Full Name
            </label>

            <input
              type="text"
              value={user.name || ""}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-400">
              Email Address
            </label>

            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-400">
              User ID
            </label>

            <input
              type="text"
              value={user.id || ""}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-400">
              Email Verified
            </label>

            <input
              type="text"
              value={user.emailVerified ? "Verified" : "Not Verified"}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-slate-400 text-sm">
            Recipes Created
          </h4>

          <p className="text-3xl font-bold text-white mt-2">
            0
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-slate-400 text-sm">
            Favorites
          </h4>

          <p className="text-3xl font-bold text-white mt-2">
            0
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h4 className="text-slate-400 text-sm">
            Total Views
          </h4>

          <p className="text-3xl font-bold text-white mt-2">
            0
          </p>
        </div>
      </div>
    </div>
  );
}