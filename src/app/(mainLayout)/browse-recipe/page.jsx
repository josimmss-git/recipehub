//  import { getAllRecipes } from "@/lib/api/recipes/action";
// // import Link from "next/link";
// // import Image from "next/image";
// // import FilterPanel from "@/components/FilterPanel";
// // import { Button } from "@heroui/react";


// // export default async function RecipesPage({ searchParams }) {
// //   // ✅ Await the promise and destructure all params
// //   const { search = "", category = "All Categories", cuisine = "All Cuisines", difficulty = "All Difficulties", sort = "Newest" } = await searchParams;

// //   let recipes = [];
// //   try {
// //     // Pass all filters to the data layer
// //     recipes = await getAllRecipes({ search, category, cuisine, difficulty, sort });
// //   } catch (error) {
// //     console.error("Error fetching recipes:", error);
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-10">
// //       {/* Header */}
// //       <div className="text-center mb-10">
// //         <h1 className="text-4xl font-extrabold">Browse Recipes</h1>
// //         <p className="text-gray-500 mt-2">
// //           Discover delicious recipes shared by our community.
// //         </p>
// //       </div>

// //       {/* Filter Panel */}
// //       <div className="mb-10">
// //         <FilterPanel />
// //       </div>

// //       {/* Recipe Count */}
// //       <div className="flex items-center justify-between mb-6">
// //         <h2 className="text-xl font-semibold">
// //           {recipes.length} Recipes Found
// //         </h2>
// //       </div>

// //       {/* Recipe Grid */}
// //       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //         {recipes.map((recipe) => (
// //           <div
// //             key={recipe._id.toString()}
// //             className="group overflow-hidden rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
// //           >
// //             <div className="overflow-hidden">
// //               <Image
// //                 src={recipe.image || "/placeholder.jpg"}
// //                 alt={recipe.title}
// //                 width={500}
// //                 height={300}
// //                 className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
// //               />
// //             </div>
// //             <div className="p-5 space-y-3">
// //               <h2 className="text-xl font-bold line-clamp-1">
// //                 {recipe.title}
// //               </h2>
// //               <div className="flex flex-wrap gap-2">
// //                 <span className="badge badge-primary">{recipe.category}</span>
// //                 <span className="badge badge-secondary">{recipe.cuisine}</span>
// //               </div>
// //               <div className="flex justify-between text-sm text-gray-500">
// //                 <span>❤️ {recipe.likeCount || 0} Likes</span>
// //                 <span>{recipe.preparationTime} min</span>
// //               </div>
// //               <Link
// //                 href={`/browse-recipe/${recipe._id}`}
// //                 className="btn btn-warning w-full"
// //               >
// //                 <Button className="btn btn-warning w-full">
// //                   View Recipe

// //                 </Button>
                
// //               </Link>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }



// import { getAllRecipes } from "@/lib/api/recipes/action";
// import Link from "next/link";
// import Image from "next/image";
// import FilterPanel from "@/components/FilterPanel";
// import { Button } from "@heroui/react";


// export default async function RecipesPage({ searchParams }) {
//   // ✅ Await the promise and destructure all params
//   const { search = "", category = "All Categories", cuisine = "All Cuisines", difficulty = "All Difficulties", sort = "Newest" } = await searchParams;

//   let recipes = [];
//   try {
//     // Pass all filters to the data layer
//     recipes = await getAllRecipes({ search, category, cuisine, difficulty, sort });
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold">Browse Recipes</h1>
//         <p className="text-gray-500 mt-2">
//           Discover delicious recipes shared by our community.
//         </p>
//       </div>

//       {/* Filter Panel */}
//       <div className="mb-10">
//         <FilterPanel />
//       </div>

//       {/* Recipe Count */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">
//           {recipes.length} Recipes Found
//         </h2>
//       </div>

//       {/* Recipe Grid */}
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {recipes.map((recipe) => (
//           <div
//             key={recipe._id.toString()}
//             className="group overflow-hidden rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
//           >
//             <div className="overflow-hidden">
//               <Image
//                 src={recipe.image || "/placeholder.jpg"}
//                 alt={recipe.title}
//                 width={500}
//                 height={300}
//                 className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//             <div className="p-5 space-y-3">
//               <h2 className="text-xl font-bold line-clamp-1">
//                 {recipe.title}
//               </h2>
//               <div className="flex flex-wrap gap-2">
//                 <span className="badge badge-primary">{recipe.category}</span>
//                 <span className="badge badge-secondary">{recipe.cuisine}</span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-500">
//                 <span>❤️ {recipe.likeCount || 0} Likes</span>
//                 <span>{recipe.preparationTime} min</span>
//               </div>
//               <Link
//                 href={`/browse-recipe/${recipe._id}`}
//                 className="btn btn-warning w-full"
//               >
//                 <Button className="btn btn-warning w-full">
//                   View Recipe

//                 </Button>
                
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



 import { getAllRecipes } from "@/lib/api/recipes/action";
import Link from "next/link";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel";
import { Button } from "@heroui/react";

export default async function RecipesPage({ searchParams }) {
  const {
    search = "",
    category = "All Categories",
    cuisine = "All Cuisines",
    difficulty = "All Difficulties",
    sort = "Newest",
    page = "1",
  } = await searchParams;

  let recipes = [];
  let totalRecipes = 0;
  let totalPages = 1;
  let currentPage = Number(page);

  try {
    const data = await getAllRecipes(
      {
        search,
        category,
        cuisine,
        difficulty,
        sort,
      },
      Number(page)
    );

    recipes = data.recipes;
    totalRecipes = data.totalRecipes;
    totalPages = data.totalPages;
    currentPage = data.currentPage;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold">Browse Recipes</h1>
        <p className="text-gray-500 mt-2">
          Discover delicious recipes shared by our community.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-10">
        <FilterPanel />
      </div>

      {/* Recipe Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {totalRecipes} Recipes Found
        </h2>

        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="group overflow-hidden rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.jpg"}
                alt={recipe.title}
                width={500}
                height={300}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold line-clamp-1">
                {recipe.title}
              </h2>

              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary">
                  {recipe.category}
                </span>

                <span className="badge badge-secondary">
                  {recipe.cuisine}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>❤️ {recipe.likeCount || 0} Likes</span>
                <span>{recipe.preparationTime} min</span>
              </div>

              <Link href={`/browse-recipe/${recipe._id}`}>
                <Button color="warning" className="w-full">
                  View Recipe
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Recipes */}
      {recipes.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">
            No Recipes Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          {/* Previous */}
          <Link
            href={`?search=${encodeURIComponent(
              search
            )}&category=${encodeURIComponent(
              category
            )}&cuisine=${encodeURIComponent(
              cuisine
            )}&difficulty=${encodeURIComponent(
              difficulty
            )}&sort=${encodeURIComponent(
              sort
            )}&page=${Math.max(1, currentPage - 1)}`}
          >
            <Button
              variant="bordered"
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <Link
                key={pageNumber}
                href={`?search=${encodeURIComponent(
                  search
                )}&category=${encodeURIComponent(
                  category
                )}&cuisine=${encodeURIComponent(
                  cuisine
                )}&difficulty=${encodeURIComponent(
                  difficulty
                )}&sort=${encodeURIComponent(
                  sort
                )}&page=${pageNumber}`}
              >
                <Button
                  color={
                    currentPage === pageNumber
                      ? "warning"
                      : "default"
                  }
                  variant={
                    currentPage === pageNumber
                      ? "solid"
                      : "bordered"
                  }
                >
                  {pageNumber}
                </Button>
              </Link>
            );
          })}

          {/* Next */}
          <Link
            href={`?search=${encodeURIComponent(
              search
            )}&category=${encodeURIComponent(
              category
            )}&cuisine=${encodeURIComponent(
              cuisine
            )}&difficulty=${encodeURIComponent(
              difficulty
            )}&sort=${encodeURIComponent(
              sort
            )}&page=${Math.min(
              totalPages,
              currentPage + 1
            )}`}
          >
            <Button
              variant="bordered"
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}