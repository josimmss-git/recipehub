import StatsCard from "./StatsCard";
import PremiumBadge from "./PremiumBadge";

export default function DashboardStats({ data }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Recipes"
        value={data.totalRecipes}
      />

      <StatsCard
        title="Favorites"
        value={data.totalFavorites}
      />

      <StatsCard
        title="Total Likes"
        value={data.totalLikes}
      />

      <PremiumBadge premium={data.premium} />
    </div>
  );
}