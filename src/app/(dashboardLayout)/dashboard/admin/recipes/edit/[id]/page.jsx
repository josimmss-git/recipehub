import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import EditRecipeForm from "@/components/dashboard/admin/EditRecipeForm";

export default async function EditRecipePage({ params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await dbConnect();

  const recipe = await db.collection("recipes").findOne({
    _id: new ObjectId(id),
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Edit Recipe
        </h1>

        <p className="text-base-content/70 mt-2">
          Update recipe information.
        </p>
      </div>

      <EditRecipeForm
        recipe={JSON.parse(JSON.stringify(recipe))}
      />
    </div>
  );
}