"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CarCard from "@/components/CarCard";
import FadeIn from "@/components/FadeIn";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Featured() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cars?featured=true`);

      if (!res.ok) {
        throw new Error("Failed to load featured vehicles");
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
    <section
      id="fleet"
      className="mx-auto max-w-[1800px] px-6 py-20 md:px-12"
    >
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#4263eb]">
          DISCOVER THE COLLECTION
        </p>

        <h2
          className="text-6xl leading-none md:text-8xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          FEATURED VEHICLES
        </h2>

        <p className="mt-4 text-sm text-gray-400">
          Find the perfect machine for your next drive.
        </p>
      </div>

      {loading && (
        <p className="py-10 text-center text-gray-400">
          Loading vehicles...
        </p>
      )}

      {error && (
        <p className="py-10 text-center text-red-400">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, index) => (
  <FadeIn key={car.id} delay={index * 0.1}>
    <CarCard car={car} />
  </FadeIn>
))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/fleet"
          className="inline-flex items-center gap-4 rounded-full bg-[#4263eb] px-8 py-4 text-sm font-medium transition hover:bg-blue-500"
        >
          Explore Full Fleet
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}