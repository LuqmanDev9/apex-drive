import Image from "next/image";
import Link from "next/link";
import {
  CarFront,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1800px] items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-12 md:px-12 md:py-20"
    >
      {/* LEFT SIDE */}

      <div>
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#4263eb]">
          ABOUT APEX DRIVE
        </p>

        <h2
          className="text-5xl leading-none sm:text-6xl md:text-8xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          FIND YOUR DREAM
          <br />
          CAR TODAY.
        </h2>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
          Experience the freedom of the road with our
          exclusive collection of luxury and
          high-performance vehicles. Every journey
          deserves something extraordinary.
        </p>

        {/* FEATURES */}

        <div className="my-8 grid grid-cols-2 gap-6 border-y border-white/10 py-8">
          <div>
            <CarFront size={30} className="mb-4" />

            <h3 className="font-semibold">
              Premium Fleet
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Drive the extraordinary.
            </p>
          </div>

          <div>
            <ShieldCheck size={30} className="mb-4" />

            <h3 className="font-semibold">
              Elite Service
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Luxury made effortless.
            </p>
          </div>
        </div>

        <Link
          href="/fleet"
          className="inline-flex items-center gap-4 rounded-full bg-[#4263eb] px-7 py-4 text-sm font-medium transition hover:bg-blue-500"
        >
          Explore Fleet
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* RIGHT SIDE */}

      <div className="grid grid-cols-2 gap-3 md:gap-4">

        {/* MAIN IMAGE */}

        <div className="relative col-span-2 h-[220px] overflow-hidden rounded-lg md:h-[280px] md:rounded-xl">
          <Image
            src="/images/about.webp"
            alt="Luxury sports car"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-700 hover:scale-105"
          />
        </div>

        {/* WHEEL IMAGE */}

        <div className="relative aspect-[1.4] overflow-hidden rounded-lg md:rounded-xl">
          <Image
            src="/images/wheel.webp"
            alt="Sports car wheel"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-700 hover:scale-110"
          />
        </div>

        {/* INTERIOR IMAGE */}

        <div className="relative aspect-[1.4] overflow-hidden rounded-lg md:rounded-xl">
          <Image
            src="/images/interior.webp"
            alt="Luxury car interior"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition duration-700 hover:scale-110"
          />
        </div>

      </div>
    </section>
  );
}