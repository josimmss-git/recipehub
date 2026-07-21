"use client";

import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaSignOutAlt, FaLock } from "react-icons/fa";

const DashboardSidebar = ({
  session,
  role,
  menuItems,
  pathname,
  handleLogout,
  addRecipeLocked = false,
}) => {
  const [hoveredLocked, setHoveredLocked] = useState(false);

  return (
    <aside className="w-64 min-h-screen border-r border-white/10">
      <div className="h-full flex flex-col bg-slate-950">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Logo />
        </div>

        {/* User Section */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-indigo-500">
              <Image
                src={
                  session?.user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    session?.user?.name || "User"
                  )}&background=6366f1&color=fff`
                }
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* User Info */}
            <div className="overflow-hidden">
              <h3 className="text-sm font-semibold truncate">
                {session?.user?.name}
              </h3>

              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-400 uppercase">
                  {role}
                </p>

                {/* Role Badge */}
                {role === "admin" && (
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-red-500 text-white">
                    Admin
                  </span>
                )}

                {/* Premium Badge */}
                {session?.user?.isPremium && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900">
                    Premium
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-xs uppercase text-slate-500 px-3 mb-2">
            Navigation
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            const isAddRecipeItem = item.href === "/dashboard/add-recipe";
            const isLocked = isAddRecipeItem && addRecipeLocked;

            if (isLocked) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoveredLocked(true)}
                  onMouseLeave={() => setHoveredLocked(false)}
                >
                  <div
                    className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-slate-600 cursor-not-allowed select-none"
                    aria-disabled="true"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                    <FaLock size={12} className="text-amber-500" />
                  </div>

                  {hoveredLocked && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 w-56 rounded-lg bg-slate-800 border border-white/10 px-3 py-2 text-xs text-slate-200 shadow-lg">
                      Become a premium member to unlock adding unlimited
                      recipes.
                      <Link
                        href="/dashboard/upgrade"
                        className="block mt-2 font-semibold text-amber-400 hover:text-amber-300 underline"
                      >
                        Upgrade now
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">

          {/* Back to Site */}
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <FaHome size={15} />
            Back to Site
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt size={15} />
            Logout
          </button>

        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
