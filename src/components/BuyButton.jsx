"use client";

export default function BuyButton({
  recipe,
  user,
}) {
  const handleBuy = async () => {
    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipeId: recipe._id,
        recipeTitle: recipe.title,
        recipeImage: recipe.image,
        userEmail: user.email,
        userName: user.name,
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
      onClick={handleBuy}
      className="btn btn-primary w-full"
    >
      Buy Recipe
    </button>
  );
}