import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import EditRecipeForm from "@/components/dashboard/EditRecipeForm";

export default async function UpdateRecipePage({ params }) {
  const { id } = await params;

  const db = await dbConnect();

  const recipe = await db.collection("recipes").findOne({
    _id: new ObjectId(id),
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Update Recipe
      </h1>

      <EditRecipeForm
        recipe={{
          ...recipe,
          _id: recipe._id.toString(),
        }}
      />
    </div>
  );
}