"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

export default function DeleteRecipeButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Recipe?",
      text: "This recipe will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/admin/recipes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Delete failed.",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong.",
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-error text-white"
    >
      <FaTrash />
    </button>
  );
}