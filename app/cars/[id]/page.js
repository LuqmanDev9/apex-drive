"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [availability, setAvailability] = useState(null);
const [checking, setChecking] = useState(false);
const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cars/${id}`);

        if (!res.ok) {
          throw new Error("Vehicle not found");
        }

        const data = await res.json();
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const checkAvailability = async () => {
  setChecking(true);
  setBookingError("");
  setAvailability(null);

  try {
    const res = await fetch(
      `${API_URL}/api/cars/${id}/availability?pickup=${pickup}&returnDate=${returnDate}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setAvailability(data);
  } catch (error) {
    setBookingError(error.message);
  } finally {
    setChecking(false);
  }
};

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-[1800px] px-6 py-12 md:px-12">

        <Link
          href="/fleet"
          className="mb-10 inline-flex items-center gap-3 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Fleet
        </Link>

        {loading ? (
          <p className="py-20 text-center text-gray-400">
            Loading vehicle...
          </p>
        ) : error ? (
          <p className="py-20 text-center text-red-400">
            {error}
          </p>
        ) : car && (
          <div className="grid items-start gap-12 lg:grid-cols-2">

            {/* VEHICLE IMAGE */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px]">
              <Image
                src={car.image}
                alt={car.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* VEHICLE INFORMATION */}
            <div className="py-4">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#4263eb]">
                {car.category} Collection
              </p>

              <h1
                className="text-6xl uppercase leading-none md:text-8xl"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {car.name}
              </h1>

              <p className="mt-5 max-w-lg leading-relaxed text-gray-400">
                Experience exceptional performance and the
                thrill of the open road.
              </p>

              <div className="my-8 border-y border-white/10 py-6">
                <span className="text-4xl font-semibold">
                  AED {car.price.toLocaleString()}
                </span>

                <span className="ml-3 text-gray-400">
                  / day
                </span>
              </div>

              {/* RESERVATION FORM */}
              <div className="rounded-[28px] border border-white/10 bg-[#1b1b1b] p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-semibold">
                  Reserve your vehicle
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pickup" className="mb-3 block text-sm text-gray-400">
                      Pick-up date
                    </label>

                    <input
                      id="pickup"
                      type="date"
                      value={pickup}
                      onChange={(e) => {
  setPickup(e.target.value);
  setAvailability(null);
  setBookingError("");
}}
                      className="w-full rounded-xl border border-white/10 bg-[#101010] p-4 outline-none focus:border-[#4263eb] [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label htmlFor="return" className="mb-3 block text-sm text-gray-400">
                      Return date
                    </label>

                    <input
                      id="return"
                      type="date"
                      min={pickup}
                      value={returnDate}
                      onChange={(e) => {
  setReturnDate(e.target.value);
  setAvailability(null);
  setBookingError("");
}}
                      className="w-full rounded-xl border border-white/10 bg-[#101010] p-4 outline-none focus:border-[#4263eb] [color-scheme:dark]"
                    />
                  </div>
                </div>

                <button
  onClick={checkAvailability}
  disabled={
    checking || !pickup || !returnDate || returnDate <= pickup
  }
  className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#4263eb] py-4 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
>
  {checking ? "Checking..." : "Check Availability"}
  <ArrowUpRight size={20} />
</button>

{bookingError && (
  <p className="mt-4 text-sm text-red-400">
    {bookingError}
  </p>
)}

{availability && (
  <div className="mt-6 space-y-4 border-t border-white/10 pt-6">

    <p className={availability.available ? "text-green-400" : "text-red-400"}>
      {availability.available
        ? "Vehicle available"
        : "Vehicle unavailable"}
    </p>

    <div className="flex justify-between text-gray-400">
      <span>Daily rate</span>
      <span>AED {car.price.toLocaleString()}</span>
    </div>

    <div className="flex justify-between text-gray-400">
      <span>Rental duration</span>
      <span>{availability.days} days</span>
    </div>

    <div className="flex items-center justify-between border-t border-white/10 pt-4">
      <span>Total price</span>

      <span className="text-2xl font-semibold">
        AED {availability.totalPrice.toLocaleString()}
      </span>
    </div>

    {availability.available && (
      <Link
        href={`/booking?carId=${id}&pickup=${pickup}&returnDate=${returnDate}`}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-[#4263eb] py-4 font-medium transition hover:bg-blue-500"
      >
        Continue to Booking
        <ArrowUpRight size={20} />
      </Link>
    )}

  </div>
)}

              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}