import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";

import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/getCurrentUser";
import EditRecipeForm from "@/components/dashboard/EditRecipeForm";

export default async function EditRecipePage({ params }) {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const db = await dbConnect();

  const recipe = await db.collection("recipes").findOne({
    _id: new ObjectId(params.id),
    userEmail: user.email,
  });

  if (!recipe) {
    notFound();
  }

  recipe._id = recipe._id.toString();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Update Recipe
      </h1>

      <EditRecipeForm recipe={recipe} />
    </div>
  );
}