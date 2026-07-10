"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { authClient, useSession } from "@/lib/auth-client";

import { usePathname, useRouter } from "next/navigation";

import {
  FaHome,
  FaPlus,
  FaUserCircle,
  FaUsers,
  FaBookOpen,
  FaHeart,
  FaShoppingBag,
  FaFlag,
  FaReceipt,
  FaCrown,
  FaStar,
  FaChartBar,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  const role = session?.user?.role || "user";
  const isPremium = session?.user?.isPremium || false;

  /* =========================
     USER MENU
  ========================= */
  const user = [
    { label: "Overview", href: "/dashboard", icon: FaHome },

    {
      label: "My Recipes",
      href: "/dashboard/my-recipes",
      icon: FaBookOpen,
    },

    {
      label: "Add Recipe",
      href: "/dashboard/add-recipe",
      icon: FaPlus,
    },

    {
      label: "Favorite Recipes",
      href: "/dashboard/favorites",
      icon: FaHeart,
    },

    {
      label: "Purchased Recipes",
      href: "/dashboard/my-purchased-recipes",
      icon: FaShoppingBag,
    },

    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: FaUserCircle,
    },
  ];

  /* =========================
     PREMIUM MENU
  ========================= */
  const premium = [
    {
      label: "Premium Dashboard",
      href: "/dashboard/premium",
      icon: FaCrown,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: FaChartBar,
    },
    {
      label: "Exclusive Recipes",
      href: "/dashboard/exclusive",
      icon: FaStar,
    },
  ];

  /* =========================
     ADMIN MENU
  ========================= */
 const admin = [
  {
    label: "Overview",
    href: "/dashboard/admin",
    icon: FaHome,
  },

  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: FaUsers,
  },

  {
    label: "Manage Recipes",
    href: "/dashboard/admin/recipes",
    icon: FaBookOpen,
  },

  {
    label: "Review Reports",
    href: "/dashboard/admin/reports",
    icon: FaFlag,
  },

  {
    label: "Moderate Platform Activities",
    href: "/dashboard/admin/moderation",
    icon: FaUserCircle,
  },
];

  /* =========================
     ROLE BASED MENU
  ========================= */
  let menuItems = [];

  if (role === "admin") {
    menuItems = admin;
  } else if (isPremium) {
    menuItems = [...user, ...premium];
  } else {
    menuItems = user;
  }

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <DashboardSidebar
        session={session}
        role={role}
        menuItems={menuItems}
        pathname={pathname}
        handleLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}