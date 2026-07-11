"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Button } from "@heroui/react";

export default function DeleteUserButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", data.message, "success");
        router.refresh();
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Delete failed. Server error.", "error");
    }
  };

  return (
    <Button
      
      
      onClick={handleDelete}
      className="btn btn-sm btn-error text-white"
    >
      <FaTrash />
    </Button>
  );
}