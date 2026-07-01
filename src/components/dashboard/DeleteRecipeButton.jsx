"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function DeleteRecipeButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Recipe deleted successfully.");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete recipe.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm btn-error text-white"
    >
      <FaTrash />
      Delete
    </button>
  );
}