import Link from "next/link";

export default function PremiumPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 border">

        <h1 className="text-4xl font-bold text-center mb-3">
          ⭐ Premium Membership
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Unlock unlimited recipe creation and premium features.
        </p>

        <div className="space-y-4 mb-8">

          <div className="flex items-center gap-3">
            ✅ Unlimited Recipe Upload
          </div>

          <div className="flex items-center gap-3">
            ✅ Premium Badge
          </div>

          <div className="flex items-center gap-3">
            ✅ Access Premium Recipes
          </div>

          <div className="flex items-center gap-3">
            ✅ Future Premium Features
          </div>

        </div>

        <div className="text-center">

          <h2 className="text-5xl font-bold text-warning">
            ৳199
          </h2>

          <p className="text-gray-500 mb-6">
            per month
          </p>

          <Link
            href="/dashboard/payment"
            className="btn btn-warning btn-lg"
          >
            Upgrade to Premium
          </Link>

        </div>

      </div>
    </div>
  );
}