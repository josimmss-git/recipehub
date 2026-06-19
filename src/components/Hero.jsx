import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium mb-4">
              🍽️ Welcome to RecipeHub
            </span>

            <h1 className="text-4xl  md:text-5xl lg:text-6xl font-bold ">
              Discover, Share & Cook
              <span className="block text-orange-500">
                Amazing Recipes
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Explore delicious recipes from around the world,
              save your favorites, share your own creations,
              and become part of a passionate cooking community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/recipes"
                className="px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                Browse Recipes
              </Link>

              <Link
                href="/register"
                className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition"
              >
                Join Community
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-orange-500">
                  10K+
                </h3>
                <p className="text-gray-500">Recipes</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-green-500">
                  5K+
                </h3>
                <p className="text-gray-500">Members</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-orange-500">
                  50K+
                </h3>
                <p className="text-gray-500">Favorites</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-200 blur-3xl opacity-30 rounded-full"></div>

            <Image
              src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Delicious Food"
              width={700}
              height={700}
              className="relative rounded-3xl shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;