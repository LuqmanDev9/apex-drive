import Link from "next/link";
import {
  CarFront,
  CalendarDays,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CarFront,
    title: "Choose Your Car",
    description:
      "Explore our exclusive collection and find your perfect vehicle.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Book Your Dates",
    description:
      "Select your rental dates and confirm your reservation.",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Enjoy the Drive",
    description:
      "Collect your keys and experience the road like never before.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1800px] px-6 py-20 md:px-12"
    >
      {/* HEADING */}
      <div className="mb-12 text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#4263eb]">
          SIMPLE. SEAMLESS. EFFORTLESS.
        </p>

        <h2
          className="text-6xl leading-none md:text-8xl"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          PICK YOUR CAR.
        </h2>

        <p className="mt-4 text-sm text-gray-400 md:text-base">
          Three simple steps to your next unforgettable drive.
        </p>
      </div>

      {/* STEP CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="group rounded-[28px] border border-white/5 bg-[#1b1b1b] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#4263eb]/50 md:p-10"
            >
              <div className="mb-12 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4263eb]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <span
                  className="text-6xl text-white/10 transition group-hover:text-[#4263eb]"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-4xl uppercase"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {step.title}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/fleet"
          className="inline-flex items-center gap-4 rounded-full bg-[#4263eb] px-8 py-4 text-sm font-medium transition hover:bg-blue-500"
        >
          Find Your Car
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}