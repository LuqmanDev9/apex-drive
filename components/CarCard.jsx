import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CarCard({ car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group overflow-hidden rounded-[28px] bg-[#1b1b1b]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-6">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-gray-500">
            {car.category}
          </p>

          <h3
            className="text-3xl uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {car.name}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            ${car.price.toLocaleString()} / day
          </p>
        </div>

        <div className="shrink-0 rounded-full bg-[#4263eb] p-3 transition group-hover:bg-blue-500">
          <ArrowUpRight size={22} />
        </div>
      </div>
    </Link>
  );
}