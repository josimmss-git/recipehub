"use client";

import { useSession } from "@/lib/auth-client";

export default function PurchaseButton({ recipe }) {
  const { data: session } = useSession();

  const handlePurchase = async () => {
    if (!session?.user) {
      alert("Please login first.");
      return;
    }

    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe._id,
        recipeTitle: recipe.title,
        recipeImage: recipe.image,
        userEmail: session.user.email,
        userName: session.user.name,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Recipe Purchased Successfully.");
    } else {
      alert(data.message);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      className="btn btn-success"
    >
      Purchase
    </button>
  );
}