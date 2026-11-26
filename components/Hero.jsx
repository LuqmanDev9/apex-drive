"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1800px] px-6 md:px-12 pb-16 pt-10">

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center leading-none tracking-tight"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(3.5rem, 14vw, 16rem)",
        }}
      >
        YOUR NEXT CAR
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mt-4 h-[250px] overflow-hidden rounded-[100px] sm:h-[400px] md:h-[550px] xl:h-[650px] md:rounded-[350px]"
      >
        <Image
          src="/images/hero1.webp"
          alt="Luxury sports car"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />
      </motion.div>

    </section>
  );
}