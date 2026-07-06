"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RoleButton({ id, role }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async () => {
    const newRole = role === "user" ? "admin" : "user";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to make this user ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const res = await fetch("/api/admin/users/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          role: newRole,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRoleChange}
      disabled={loading}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
        role === "user"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-orange-600 hover:bg-orange-700 text-white"
      } disabled:opacity-50`}
    >
      {loading
        ? "Updating..."
        : role === "user"
        ? "Make Admin"
        : "Remove Admin"}
    </button>
  );
}