export default function PremiumBadge({ premium }) {
  return (
    <div className="rounded-xl border bg-base-100 p-6 shadow">
      <h3 className="text-sm text-gray-500">
        Premium Status
      </h3>

      <p
        className={`mt-3 text-xl font-bold ${
          premium ? "text-success" : "text-error"
        }`}
      >
        {premium ? "ACTIVE" : "NOT PREMIUM"}
      </p>
    </div>
  );
}