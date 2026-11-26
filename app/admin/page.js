"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowUpRight,
  RefreshCw,
  ClipboardList,
  CalendarCheck,
  CalendarX,
  LockKeyhole,
  LogOut,
} from "lucide-react";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null);

  // FETCH BOOKINGS AND CARS

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [bookingRes, carRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings`, {
          headers: {
            Authorization: `Bearer ${password}`,
          },
          cache: "no-store",
        }),
        fetch(`${API_URL}/api/cars`),
      ]);

      if (bookingRes.status === 401) {
        handleLogout();
        throw new Error("Incorrect admin password");
      }

      if (!bookingRes.ok || !carRes.ok) {
        throw new Error("Failed to load dashboard");
      }

      setBookings(await bookingRes.json());
      setCars(await carRes.json());
      setAuthenticated(true);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  // LOGOUT

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword("");
    setBookings([]);
    setCars([]);
    setError("");
  };

  // CANCEL BOOKING

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;

    setCancelling(id);
    setError("");

    try {
      const res = await fetch(
        `${API_URL}/api/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${password}`,
          },
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        handleLogout();
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        throw new Error(data.message || "Cancellation failed");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? data.booking : booking
        )
      );

    } catch (error) {
      setError(error.message);
    } finally {
      setCancelling(null);
    }
  };

  // LOGIN SCREEN

  if (!authenticated) {
    return (
      <main className="flex min-h-[90vh] items-center justify-center px-6">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#1b1b1b] p-10"
        >

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4263eb]">
            <LockKeyhole size={28} />
          </div>

          <p className="mb-3 text-center text-xs tracking-widest text-[#4263eb]">
            RESTRICTED ACCESS
          </p>

          <h1
            className="text-center text-6xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            ADMIN LOGIN.
          </h1>

          <p className="mb-8 mt-3 text-center text-sm text-gray-400">
            Enter your password to access the dashboard.
          </p>

          <input
            type="password"
            placeholder="Enter admin password"
            aria-label="Admin password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-[#101010] px-5 py-4 outline-none focus:border-[#4263eb]"
          />

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-6 w-full rounded-full bg-[#4263eb] py-4 font-medium hover:bg-blue-500 disabled:opacity-40"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-gray-400 hover:text-white"
          >
            Back to website
          </Link>

        </form>

      </main>
    );
  }

  // STATISTICS

  const confirmed = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  const stats = [
    {
      title: "Total bookings",
      value: bookings.length,
      icon: ClipboardList,
    },
    {
      title: "Confirmed",
      value: confirmed,
      icon: CalendarCheck,
    },
    {
      title: "Cancelled",
      value: cancelled,
      icon: CalendarX,
    },
  ];

  const getCarName = (id) =>
    cars.find((car) => car.id === id)?.name ||
    "Unknown vehicle";

  return (
    <main className="mx-auto min-h-screen max-w-[1800px] px-6 py-8 md:px-12">

      {/* NAVBAR */}

      <header className="mb-16 flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1b1b1b] px-6 py-4">

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#4263eb] p-2">
            <Zap size={22} />
          </div>

          <span className="font-bold">
            APEX. / ADMIN
          </span>
        </div>

        <div className="flex items-center gap-6">

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            Website
            <ArrowUpRight size={18} />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loading || cancelling !== null}
            className="flex items-center gap-2 text-sm text-red-400 disabled:opacity-40"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </header>

      {/* HEADING */}

      <p className="mb-3 text-xs font-semibold tracking-widest text-[#4263eb]">
        RESERVATION MANAGEMENT
      </p>

      <h1
        className="text-6xl leading-none md:text-8xl"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        ADMIN DASHBOARD.
      </h1>

      <p className="mt-4 text-gray-400">
        View and manage your vehicle reservations.
      </p>

      {/* STAT CARDS */}

      <div className="my-10 grid gap-5 sm:grid-cols-3">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-[28px] border border-white/10 bg-[#1b1b1b] p-8"
            >
              <Icon
                size={28}
                className="mb-6 text-[#4263eb]"
              />

              <p className="text-sm text-gray-400">
                {stat.title}
              </p>

              <p className="mt-2 text-5xl font-semibold">
                {stat.value}
              </p>
            </div>
          );
        })}

      </div>

      {/* TABLE HEADER */}

      <div className="mb-6 flex items-center justify-between gap-4">

        <h2 className="text-2xl font-semibold">
          All Reservations
        </h2>

        <button
          onClick={fetchData}
          disabled={loading || cancelling !== null}
          className="flex items-center gap-2 rounded-full bg-[#1b1b1b] px-5 py-3 text-sm hover:bg-[#252525] disabled:opacity-40"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>

      </div>

      {error && (
        <p role="alert" className="mb-6 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* BOOKINGS TABLE */}

      {loading ? (
        <p className="py-20 text-center text-gray-400">
          Loading reservations...
        </p>
      ) : bookings.length === 0 ? (
        <div className="rounded-[28px] bg-[#1b1b1b] py-20 text-center">

          <ClipboardList
            size={40}
            className="mx-auto mb-4 text-gray-500"
          />

          <h3 className="text-xl">No reservations yet.</h3>

          <p className="mt-2 text-sm text-gray-400">
            New bookings will appear here.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-[#1b1b1b]">

          <table className="w-full whitespace-nowrap text-left text-sm">

            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                {[
                  "Reference",
                  "Customer",
                  "Vehicle",
                  "Pick-up",
                  "Return",
                  "Total",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th key={heading} className="p-5">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >

                  <td className="p-5 font-medium">
                    APX-{booking.id}
                  </td>

                  <td className="p-5">
                    <p>{booking.name}</p>

                    <p className="mt-1 text-xs text-gray-500">
                      {booking.email}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {booking.phone}
                    </p>
                  </td>

                  <td className="p-5">
                    {getCarName(booking.carId)}
                  </td>

                  <td className="p-5">
                    {booking.pickup}
                  </td>

                  <td className="p-5">
                    {booking.returnDate}
                  </td>

                  <td className="p-5">
                    AED {booking.totalPrice.toLocaleString()}
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-2 text-xs capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="p-5">
                    {booking.status === "confirmed" ? (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        disabled={cancelling !== null}
                        className="rounded-full border border-red-500/30 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                      >
                        {cancelling === booking.id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}

    </main>
  );
}