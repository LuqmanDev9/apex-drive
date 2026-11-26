"use client";

import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "Fleet", href: "/fleet" },
  { name: "Contact", href: "/#contact" },
];

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-[1800px] px-6 pt-6 md:px-12">

      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[#1a1a1a]/80 px-6 py-3 shadow-lg backdrop-blur-xl">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-[#4263eb] p-2">
            <Zap size={20} fill="white" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            APEX.
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm text-gray-400 transition-colors duration-300 hover:text-white"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* BOOK NOW */}
        <Link
          href="/fleet"
          className="hidden rounded-full bg-[#4263eb] px-6 py-3 text-sm font-medium transition hover:bg-blue-500 md:block"
        >
          Book Now
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </nav>

      {/* MOBILE NAVIGATION */}
      {open && (
        <ul className="mt-3 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#1a1a1a]/95 p-6 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

    </header>
  );
}