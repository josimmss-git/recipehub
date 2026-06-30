import Link from "next/link";
import Image from "next/image";
import { Card, Button } from "@heroui/react";
import {
  FaArrowLeft,
  FaClock,
  FaUsers,
  FaHeart,
} from "react-icons/fa";

import { baseURL } from "@/baseUrl";

const fetchRecipe = async (id) => {
  const res = await fetch(`${baseURL}/api/recipes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return res.json();
};

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const recipe = await fetchRecipe(id);

  return (
    <div className="min-h-screen py-16 px-6 max-w-6xl mx-auto w-full space-y-12">
      {/* Back Button */}
      <Link href="/browse-recipe">
        <Button
          variant="light"
          className="text-slate-400 hover:text-white"
          startContent={<FaArrowLeft />}
        >
          Back to Recipes
        </Button>
      </Link>

      {/* Recipe Banner */}
      <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <Image
          src={recipe?.image || "/placeholder-food.jpg"}
          alt={recipe?.title || "Recipe"}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

        <span className="absolute top-6 left-6 bg-pink-500 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-pink-400/20 shadow-lg z-20">
          {recipe?.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {recipe?.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <FaClock className="text-pink-500" />
                <span>{recipe?.cookingTime} Minutes</span>
              </div>

              <div className="flex items-center gap-2">
                <FaUsers className="text-pink-500" />
                <span>{recipe?.servings} Servings</span>
              </div>

              <div className="flex items-center gap-2">
                <FaHeart className="text-pink-500" />
                <span>{recipe?.likesCount || 0} Likes</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <Card className="bg-slate-900/40 border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ingredients
            </h2>

            <p className="text-slate-300 whitespace-pre-line leading-relaxed">
              {recipe?.ingredients}
            </p>
          </Card>

          {/* Instructions */}
          <Card className="bg-slate-900/40 border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Instructions
            </h2>

            <p className="text-slate-300 whitespace-pre-line leading-relaxed">
              {recipe?.instructions}
            </p>
          </Card>

          {/* Author */}
          <Card className="bg-slate-900/40 border border-white/10 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recipe Author
            </h2>

            <div className="space-y-2">
              <p className="text-white font-semibold">
                {recipe?.authorName || "Anonymous"}
              </p>

              <p className="text-slate-400">
                {recipe?.authorEmail || "No email available"}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="bg-slate-900/40 border border-white/10 p-6 space-y-4">
            <h3 className="text-xl font-bold text-white">
              Recipe Actions
            </h3>

            <Button
              color="danger"
              className="w-full font-semibold"
            >
              ❤️ Add to Favorites
            </Button>

            <Button
              variant="bordered"
              className="w-full font-semibold"
            >
              👍 Like Recipe
            </Button>
          </Card>

          <Card className="bg-slate-900/40 border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Recipe Summary
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Category</span>
                <span>{recipe?.category}</span>
              </div>

              <div className="flex justify-between">
                <span>Cooking Time</span>
                <span>{recipe?.cookingTime} min</span>
              </div>

              <div className="flex justify-between">
                <span>Servings</span>
                <span>{recipe?.servings}</span>
              </div>

              <div className="flex justify-between">
                <span>Likes</span>
                <span>{recipe?.likesCount || 0}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// <Link href={`/recipe/${recipe._id}`}>
//   View Recipe
// </Link>