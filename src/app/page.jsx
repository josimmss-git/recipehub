import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import Statistics from "@/components/Statistics";

export default function HomePage() {
  const stats = {
    totalRecipes: 120,
    totalCooks: 400,
    totalContributors: 10,
  };

  return (
    <div>
      <Hero />
      <WhyChoose />
      <Statistics stats={stats} />
    </div>
  );
}