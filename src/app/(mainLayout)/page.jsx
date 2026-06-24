import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
 const stats = {
  totalRecipes: 1200,
  totalUsers: 850,
  totalLikes: 15000,
};

  return (
    <div>
      <Hero />
      <WhyChoose />
      <Statistics stats={stats} />
      <Testimonials />
    </div>
  );
}