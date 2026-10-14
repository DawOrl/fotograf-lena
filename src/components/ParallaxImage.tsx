"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  /** Parallax travel in px; the image is over-scaled to cover the drift. */
  drift?: number;
  /** Jednorazowe "wywołanie" kadru przy wejściu: z bladego, płaskiego obrazu do pełnych tonów. */
  develop?: boolean;
};

export default function ParallaxImage({
  src,
  alt,
  sizes,
  preload,
  className,
  drift = 50,
  develop = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-drift, drift]);
  const animateDevelop = develop && !reduce;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={reduce ? undefined : { y, scale: 1.12 }}
        className="absolute inset-0"
        initial={animateDevelop ? { filter: "saturate(0.15) contrast(0.7) brightness(1.18)" } : false}
        animate={animateDevelop ? { filter: "saturate(1) contrast(1) brightness(1)" } : undefined}
        transition={{ duration: 2.2, delay: 0.25, ease: [0.33, 0, 0.2, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
