"use client";

import { motion, useReducedMotion } from "motion/react";

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.8,
}) {
  const reduceMotion = useReducedMotion();

  const directions = {
    up: { x: 0, y: 35 },
    down: { x: 0, y: -35 },
    left: { x: -35, y: 0 },
    right: { x: 35, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}