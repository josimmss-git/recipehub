"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";

export default function UnblockUserButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUnblock = async () => {
    const result = await Swal.fire({
      title: "Unblock User?",
      text: "This user will be able to use the platform again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Unblock",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/users/${id}/unblock`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to unblock user.");
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User has been unblocked successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUnblock}
      disabled={loading}
      className="btn btn-success btn-sm gap-2"
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <FaUserCheck />
      )}

      {loading ? "Unblocking..." : "Unblock"}
    </button>
  );
}