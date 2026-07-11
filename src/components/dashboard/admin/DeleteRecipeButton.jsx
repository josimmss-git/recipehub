"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

export default function DeleteRecipeButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Recipe?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/admin/recipes/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Deleted!", data.message, "success");
      router.refresh();
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-error btn-sm"
    >
      <FaTrash />
    </button>
  );
}