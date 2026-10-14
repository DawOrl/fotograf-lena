"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Nazwisko wjeżdża linia po linii spod maski, jak tytuł składany na kolumnie. */
export default function KineticTitle({ id }: { id: string }) {
  const reduce = useReducedMotion();
  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 1.1, delay, ease },
        };

  return (
    <h1
      id={id}
      className="mt-5 max-w-full font-serif text-[clamp(3.6rem,16vw,5rem)] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[6.75rem]"
    >
      <span className="block overflow-hidden pb-[0.06em]">
        <motion.span className="block" {...line(0.05)}>
          Lena
          <span className="ml-4 inline-block align-[0.6em] font-serif text-[0.28em] italic tracking-normal text-sepia sm:ml-6">
            fotografka
          </span>
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-[0.08em]">
        <motion.span className="block" {...line(0.18)}>
          Czarnecka
        </motion.span>
      </span>
    </h1>
  );
}
