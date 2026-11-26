import Link from "next/link";
import {
  Zap,
  ArrowUpRight,
  MapPin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-[1800px] px-6 pb-8 pt-16 md:px-12"
    >
      {/* CTA BANNER */}
      <div className="flex flex-col items-start justify-between gap-8 rounded-[40px] bg-[#4263eb] p-10 md:flex-row md:items-center md:p-16">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/70">
            YOUR NEXT EXPERIENCE AWAITS
          </p>

          <h2
            className="text-6xl leading-none md:text-8xl"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            READY TO HIT
            <br />
            THE ROAD?
          </h2>
        </div>

        <Link
          href="/fleet"
          className="inline-flex shrink-0 items-center gap-4 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          Explore Fleet
          <ArrowUpRight size={20} />
        </Link>
      </div>

      {/* FOOTER CONTENT */}
      <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3">

        {/* BRAND */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="rounded-full bg-[#4263eb] p-2">
              <Zap size={22} fill="white" />
            </div>

            <span className="text-3xl font-bold">
              APEX.
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
            Exceptional cars. Unforgettable journeys.
            Discover a better way to experience the road.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="mb-6 font-semibold">
            Explore
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/#about" className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/fleet" className="hover:text-white">
                Our Fleet
              </Link>
            </li>

            <li>
              <Link href="/#how-it-works" className="hover:text-white">
                How It Works
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-6 font-semibold">
            Contact
          </h3>

          <div className="space-y-5 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              Dallas, Texas, USA
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              hello@apexdrive.example
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-500">
        <p>© 2026 APEX DRIVE.</p>

        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}