import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Image from "next/image";
import LikeButton from "@/components/recipes/LikeButton";

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;

  const db = await dbConnect();

  const recipe = await db.collection("recipes").findOne({
    _id: new ObjectId(id),
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={600}
            height={500}
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div className="space-y-4">

          <h1 className="text-4xl font-bold">
            {recipe.title}
          </h1>

          <div className="flex gap-2 flex-wrap">
            <span className="badge badge-primary">
              {recipe.category}
            </span>

            <span className="badge badge-secondary">
              {recipe.cuisine}
            </span>

            <span className="badge badge-accent">
              {recipe.difficulty}
            </span>
          </div>

          <p>
            <strong>Preparation Time:</strong>{" "}
            {recipe.preparationTime} Minutes
          </p>

          <p>
            <strong>Likes:</strong> ❤️ {recipe.likeCount || 0}
          </p>

          <p>
            <strong>Author:</strong> {recipe.userName}
          </p>

          <div>
            <h3 className="font-bold mb-2">Ingredients</h3>

            <div className="border rounded-lg p-4">
              {recipe.ingredients}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Instructions</h3>

            <div className="border rounded-lg p-4">
              {recipe.instructions}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <LikeButton recipeId={recipe._id.toString()} />

            <button className="btn btn-success">
              Purchase
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}