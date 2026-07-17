"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { FaFilter, FaSearch, FaUndo } from "react-icons/fa";

// ✅ These are plain arrays, NOT functions
const categories = [
  "All Categories",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Beverages",
];

const cuisines = [
  "All Cuisines",
  "Bangladeshi",
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
];

const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];

const sortOptions = ["Newest", "Oldest", "Most Liked", "Preparation Time"];

export default function FilterPanel() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [cuisine, setCuisine] = useState("All Cuisines");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [sort, setSort] = useState("Newest");

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All Categories") params.set("category", category);
    if (cuisine !== "All Cuisines") params.set("cuisine", cuisine);
    if (difficulty !== "All Difficulties") params.set("difficulty", difficulty);
    if (sort !== "Newest") params.set("sort", sort);
    return params.toString();
  };

  const handleApply = () => {
    const query = buildQuery();
    router.push(`/browse-recipe${query ? `?${query}` : ""}`);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setCuisine("All Cuisines");
    setDifficulty("All Difficulties");
    setSort("Newest");
    router.push("/browse-recipe");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleApply();
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-black bg-black p-6 shadow-lg">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-300/20 blur-3xl"></div>

      <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:bg-gray-800 dark:border-gray-700"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
        </div>

        {/* Category */}
        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Cuisine */}
        <select
          className="select select-bordered w-full"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          {cuisines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          className="select select-bordered w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {difficulties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {sortOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            color="warning"
            startContent={<FaFilter />}
            onPress={handleApply}
            className="flex-1 font-semibold"


          >
            Apply
          </Button>
          <Button variant="bordered" isIconOnly title="Reset Filters" onPress={handleReset}>
            <FaUndo />
          </Button>
        </div>
      </div>
    </Card>
  );
}


