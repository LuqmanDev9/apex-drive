"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#101010] px-5 py-4 text-sm outline-none transition focus:border-[#4263eb]";

function BookingContent() {
  const searchParams = useSearchParams();

  const carId = searchParams.get("carId");
  const pickup = searchParams.get("pickup");
  const returnDate = searchParams.get("returnDate");

  const [car, setCar] = useState(null);
  const [availability, setAvailability] = useState(null);

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [booking, setBooking] = useState(null);

  // FETCH CAR AND RENTAL PRICE
  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError("");
      setCar(null);
      setAvailability(null);

      try {
        if (!carId || !pickup || !returnDate) {
          throw new Error("Missing reservation details");
        }

        const carRes = await fetch(
          `${API_URL}/api/cars/${carId}`
        );

        if (!carRes.ok) {
          throw new Error("Vehicle not found");
        }

        const carData = await carRes.json();

        const query = new URLSearchParams({
          pickup,
          returnDate,
        });

        const availabilityRes = await fetch(
          `${API_URL}/api/cars/${carId}/availability?${query}`
        );

        const availabilityData =
          await availabilityRes.json();

        if (!availabilityRes.ok) {
          throw new Error(
            availabilityData.message ||
              "Unable to check availability"
          );
        }

        if (!availabilityData.available) {
          throw new Error("Vehicle is unavailable");
        }

        setCar(carData);
        setAvailability(availabilityData);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [carId, pickup, returnDate]);

  // HANDLE INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT BOOKING
  const handleBooking = async (e) => {
    e.preventDefault();

    if (submitting || booking || !availability?.available) {
      return;
    }

    setSubmitting(true);
    setBookingError("");

    try {
      const res = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carId: Number(carId),
            pickup,
            returnDate,
            name: details.name.trim(),
            email: details.email.trim(),
            phone: details.phone.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Booking failed"
        );
      }

      setBooking(data.booking);

    } catch (error) {
      setBookingError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-gray-400">
        <Loader2 className="animate-spin" />
        Loading reservation...
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="px-6 py-32 text-center">
        <h2 className="text-3xl font-semibold">
          Unable to load booking
        </h2>

        <p className="mt-4 text-red-400">{error}</p>

        <Link
          href="/fleet"
          className="mt-8 inline-flex rounded-full bg-[#4263eb] px-8 py-4"
        >
          Back to Fleet
        </Link>
      </div>
    );
  }

  // SUCCESS STATE
  if (booking) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">

        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2
            size={48}
            className="text-green-400"
          />
        </div>

        <p className="mb-4 text-xs tracking-[0.2em] text-green-400">
          RESERVATION SUCCESSFUL
        </p>

        <h1
          className="text-6xl md:text-8xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          YOU&apos;RE BOOKED.
        </h1>

        <p className="mt-5 text-gray-400">
          Your reservation for {car.name} has been confirmed.
        </p>

        <div className="my-10 space-y-5 rounded-[28px] border border-white/10 bg-[#1b1b1b] p-8 text-left">

          <div className="flex justify-between">
            <span className="text-gray-400">
              Booking reference
            </span>
            <span>APX-{booking.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Customer
            </span>
            <span>{booking.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Vehicle
            </span>
            <span>{car.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Pick-up
            </span>
            <span>{booking.pickup}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Return
            </span>
            <span>{booking.returnDate}</span>
          </div>

          <div className="flex justify-between border-t border-white/10 pt-5">
            <span>Total price</span>
            <span className="text-xl font-semibold">
              AED {booking.totalPrice.toLocaleString()}
            </span>
          </div>

        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full bg-[#4263eb] px-8 py-4"
        >
          Back to Home
          <ArrowUpRight size={18} />
        </Link>

      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1800px] px-6 pb-24 pt-12 md:px-12">

      {/* BACK BUTTON */}
      <Link
        href={`/cars/${carId}`}
        className="mb-10 inline-flex items-center gap-3 text-sm text-gray-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Vehicle
      </Link>

      {/* HEADING */}
      <div className="mb-14 text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#4263eb]">
          YOUR NEXT EXPERIENCE AWAITS
        </p>

        <h1
          className="text-6xl leading-none md:text-9xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          COMPLETE YOUR BOOKING.
        </h1>

        <p className="mt-4 text-gray-400">
          You&apos;re one step away from the open road.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">

        {/* CUSTOMER DETAILS */}
        <form
          onSubmit={handleBooking}
          className="rounded-[28px] border border-white/10 bg-[#1b1b1b] p-6 md:p-10"
        >
          <h2 className="mb-2 text-2xl font-semibold">
            Customer Details
          </h2>

          <p className="mb-8 text-sm text-gray-400">
            Enter your information to confirm your reservation.
          </p>

          <div className="space-y-6">

            <div>
              <label
                htmlFor="name"
                className="mb-3 block text-sm text-gray-400"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                value={details.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-sm text-gray-400"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={details.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-3 block text-sm text-gray-400"
              >
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="+971"
                value={details.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

          </div>

          {bookingError && (
            <p role="alert" className="mt-5 text-sm text-red-400">
              {bookingError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#4263eb] py-4 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                Confirm Booking
                <ArrowUpRight size={20} />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            No online payment required.
          </p>
        </form>

        {/* BOOKING SUMMARY */}
        <aside className="rounded-[28px] border border-white/10 bg-[#1b1b1b] p-6 md:p-8">

          <h2 className="mb-6 text-2xl font-semibold">
            Booking Summary
          </h2>

          <div className="relative aspect-video overflow-hidden rounded-[20px]">
            <Image
              src={car.image}
              alt={car.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <p className="mt-6 text-xs uppercase tracking-widest text-[#4263eb]">
            {car.category}
          </p>

          <h3
            className="mt-2 text-5xl uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {car.name}
          </h3>

          <div className="my-6 space-y-5 border-y border-white/10 py-6">

            <div className="flex justify-between">
              <span className="text-gray-400">
                Pick-up date
              </span>
              <span>{pickup}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Return date
              </span>
              <span>{returnDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Rental duration
              </span>
              <span>{availability.days} days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Daily rate
              </span>
              <span>
                AED {car.price.toLocaleString()}
              </span>
            </div>

          </div>

          <p className="mb-2 text-sm text-gray-400">
            Total rental price
          </p>

          <p className="text-4xl font-semibold">
            AED {availability.totalPrice.toLocaleString()}
          </p>

        </aside>

      </div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Suspense
        fallback={
          <p className="py-24 text-center text-gray-400">
            Loading booking...
          </p>
        }
      >
        <BookingContent />
      </Suspense>
    </main>
  );
}