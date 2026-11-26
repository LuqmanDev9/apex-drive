"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import { useState, useEffect } from "react";

const categories = ["All", "Sports", "Supercar", "SUV"];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FleetPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filteredCars = cars
    .filter((car) => {
      const matchesCategory =
        category === "All" || car.category === category;

      const matchesSearch = car.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });


useEffect(() => {
  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cars`);

      if (!res.ok) {
        throw new Error("Failed to load vehicles");
      }

      const data = await res.json();
      setCars(data);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  fetchCars();
}, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-[1800px] px-6 pb-24 pt-16 md:px-12">

        {/* HEADING */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#4263eb]">
            THE APEX COLLECTION
          </p>

          <h1
            className="text-6xl leading-none md:text-9xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            EXPLORE OUR FLEET
          </h1>

          <p className="mt-4 text-sm text-gray-400 md:text-base">
            Exceptional cars. Unforgettable journeys.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="search"
            aria-label="Search vehicles"
            placeholder="Search your dream car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#1b1b1b] py-4 pl-14 pr-6 text-sm outline-none transition focus:border-[#4263eb]"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">

          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full px-6 py-3 text-sm transition ${
                  category === item
                    ? "bg-[#4263eb] text-white"
                    : "bg-[#1b1b1b] text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} />

            <select
              aria-label="Sort vehicles"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-white/10 bg-[#1b1b1b] px-5 py-3 text-sm outline-none"
            >
              <option value="default">Recommended</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <p className="my-6 text-sm text-gray-500">
          {filteredCars.length} vehicles found
        </p>

        {/* VEHICLE GRID */}
        {loading ? (
  <p className="py-10 text-center text-gray-400">
    Loading vehicles...
  </p>
) : error ? (
  <p className="py-10 text-center text-red-400">
    {error}
  </p>
) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <Search
              size={40}
              className="mx-auto mb-5 text-gray-600"
            />

            <h2 className="text-2xl font-semibold">
              No vehicles found.
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Try a different search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("default");
              }}
              className="mt-6 rounded-full bg-[#4263eb] px-6 py-3 text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>
    </main>
  );
}