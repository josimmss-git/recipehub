import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  // Login না থাকলে Login Page-এ পাঠাবে
  if (!user) {
    redirect("/login");
  }

  // Admin না হলে Home Page-এ পাঠাবে
  if (user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}