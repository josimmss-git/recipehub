"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function LikeButton({ recipeId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/recipes/${recipeId}/like`, {
        method: "PATCH",
      });

      console.log("Status:", res.status);

      const result = await res.json();
      console.log("Response:", result);

      if (result.success) {
        toast.success("Recipe liked successfully ❤️");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to like recipe");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      color="danger"
      radius="full"
      className="px-8 shadow-lg shadow-danger/30 hover:scale-105 transition-transform outline-2 outline-danger/50
      rounded-full text-white font-semibold py-2 bg-danger"
      isLoading={loading}
      onPress={handleLike}
    >
      ❤️ Like Recipe
    </button>
  );
}