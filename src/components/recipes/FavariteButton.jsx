"use client";

import { useSession } from "@/lib/auth-client";

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
      onClick={handleFavorite}
      className="btn btn-warning"
    >
      ❤️ Favorite
    </button>
  );
}