"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function DeleteUserButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/users/${id}/delete`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to delete user.",
        });
      }
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
      onClick={handleDelete}
      disabled={loading}
      className="btn btn-error btn-sm gap-2"
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Deleting...
        </>
      ) : (
        <>
          <FaTrash />
          Delete
        </>
      )}
    </button>
  );
}