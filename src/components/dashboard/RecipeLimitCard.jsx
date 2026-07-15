import Link from "next/link";
import { Card, Progress, Button, Chip } from "@heroui/react";
import { FaCrown } from "react-icons/fa";

export default function RecipeLimitCard({
  recipeCount,
  isPremium,
}) {
  if (isPremium) {
    return (
      <Card className="shadow-lg border border-yellow-300">
        <div className="text-center py-8 px-6">
          <FaCrown className="text-5xl text-warning mx-auto mb-4" />

          <h2 className="text-2xl font-bold">
            Premium Member
          </h2>

          <p className="text-default-500 mt-2">
            You can create unlimited recipes.
          </p>

          <Chip color="warning" className="mt-4">
            Unlimited Access
          </Chip>
        </div>
      </Card>
    );
  }

  const progress = (recipeCount / 2) * 100;

  return (
    <Card className="shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Recipe Limit
        </h2>

        <p className="text-default-500 mb-4">
          {recipeCount} / 2 Recipes Used
        </p>

        <Progress
          value={progress}
          color={recipeCount >= 2 ? "danger" : "primary"}
        />

        {recipeCount >= 2 ? (
          <div className="mt-6">
            <p className="text-danger text-sm mb-4">
              You have reached the maximum limit of 2 recipes.
            </p>

            <Link href="/dashboard/premium">
              <Button color="warning" className="w-full">
                Become Premium
              </Button>
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-success text-sm">
            You can still create {2 - recipeCount} recipe
            {2 - recipeCount > 1 ? "s" : ""}.
          </p>
        )}
      </div>
    </Card>
  );
}