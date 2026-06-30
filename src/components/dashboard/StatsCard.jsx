export default function StatsCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-base-100 p-6 shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}