"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function FavoriteButton({ recipeId }) {
  const { data: session } = useSession();

  const handleFavorite = async () => {
    if (!session?.user) {
      alert("Please login first.");
      return;
    }

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId,
        userEmail: session.user.email,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Added to favorites.");
    } else {
      alert(data.message);
    }
  };

  return (
    <button
      color="danger"
      radius="full"
      variant="outline"
      onClick={handleFavorite}
      className="hover:scale-105 transition-transform bg-accent/10 text-accent font-semibold py-2 px-8 rounded-full outline-2 outline-accent/50"
    >
      ❤️ Favorite
    </button>
  );
}