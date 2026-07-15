"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RoleButton({ id, role }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";

  const handleRoleChange = async () => {
    const result = await Swal.fire({
      title: isAdmin ? "Remove Admin?" : "Make Admin?",
      text: isAdmin
        ? "This user will be changed to a normal user."
        : "This user will become an administrator.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isAdmin ? "Remove Admin" : "Make Admin",
      cancelButtonText: "Cancel",
      confirmButtonColor: isAdmin ? "#d33" : "#2563eb",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: isAdmin ? "user" : "admin",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update role.");
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRoleChange}
      disabled={loading}
      className={`btn btn-sm gap-2 ${
        isAdmin ? "btn-error" : "btn-primary"
      }`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : isAdmin ? (
        <>
          <FaUser />
          Remove Admin
        </>
      ) : (
        <>
          <FaUserShield />
          Make Admin
        </>
      )}
    </button>
  );
}