"use client";

import { useRouter } from "next/navigation";

export default function RemoveFavoriteButton({ favoriteId }) {
  const router = useRouter();

  const handleRemove = async () => {
    const ok = confirm("Remove this recipe from favorites?");

    if (!ok) return;

    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: favoriteId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Removed successfully.");
      router.refresh();
    } else {
      alert(data.message);
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="btn btn-error btn-sm"
    >
      Remove
    </button>
  );
}