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

      const result = await res.json();

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
    <Button
      color="danger"
      isLoading={loading}
      onPress={handleLike}
    >
      ❤️ Like Recipe
    </Button>
  );
}