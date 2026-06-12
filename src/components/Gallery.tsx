"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import SectionHead from "@/components/SectionHead";
import Lightbox from "@/components/Lightbox";
import { categories, photos, type Category } from "@/data/content";

type Filter = Category | "all";

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter]
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: photos.length,
      slub: 0,
      portret: 0,
      rodzina: 0,
    };
    for (const p of photos) c[p.category]++;
    return c;
  }, []);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "Wszystkie" },
    ...categories,
  ];

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        nr="02"
        label="Portfolio"
        title={
          <>
            Wybrane kadry,{" "}
            <em className="text-sepia">które lubię najbardziej</em>
          </>
        }
      />

      <div
        role="group"
        aria-label="Filtruj kategorie portfolio"
        className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`caps cursor-pointer transition-colors duration-300 ${
                active ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              <span className={active ? "border-b border-ink pb-1" : ""}>
                {f.label}
              </span>
              <sup className="ml-1 font-serif italic">{counts[f.id]}</sup>
            </button>
          );
        })}
      </div>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((photo, i) => (
            <motion.figure
              key={photo.src.src}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 break-inside-avoid"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="group block w-full cursor-zoom-in text-left"
                aria-label={`Powiększ zdjęcie: ${photo.title}, ${photo.place}`}
              >
                <div className="overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    className="h-auto w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-baseline justify-between gap-4">
                  <span className="font-serif italic text-ink">
                    <span className="caps mr-3 not-italic text-sepia">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    {photo.title}
                  </span>
                  <span className="caps shrink-0 text-ink-soft">
                    {photo.place}
                  </span>
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        photos={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
