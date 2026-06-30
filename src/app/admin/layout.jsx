import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  // Not logged in
  if (!user) {
    redirect("/login");
  }

  // Not an admin
  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}