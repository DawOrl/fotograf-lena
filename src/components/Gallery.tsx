"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import SectionHead from "@/components/SectionHead";
import Lightbox from "@/components/Lightbox";
import { categories, photos, site, type Category, type Photo } from "@/data/content";

type Filter = Category | "all";

const anchorToFilter: Record<string, Filter> = Object.fromEntries([
  ["portfolio", "all"],
  ...categories.map((c) => [c.anchor, c.id]),
]);

/* ---------- liczba kolumn wg szerokości ekranu (SSR: 3, po hydracji: realna) ---------- */
const queries = ["(min-width: 1024px)", "(min-width: 640px)"] as const;

function subscribe(cb: () => void) {
  const lists = queries.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", cb));
  return () => lists.forEach((l) => l.removeEventListener("change", cb));
}
const getColumns = () =>
  window.matchMedia(queries[0]).matches ? 3 : window.matchMedia(queries[1]).matches ? 2 : 1;

function useColumns() {
  return useSyncExternalStore(subscribe, getColumns, () => 3);
}

/* ---------- masonry: każdy kadr trafia do najkrótszej kolumny, kolejność czytania zostaje ---------- */
const CAPTION = 0.15; // wysokość podpisu w jednostkach szerokości kolumny
const MIDDLE_OFFSET = 0.2; // środkowa kolumna startuje niżej, jak przesunięta szpalta

function distribute(list: Photo[], cols: number) {
  const heights: number[] = Array.from({ length: cols }, (_, i) => (cols === 3 && i === 1 ? MIDDLE_OFFSET : 0));
  const columns: { photo: Photo; index: number }[][] = Array.from({ length: cols }, () => []);
  list.forEach((photo, index) => {
    const target = heights.indexOf(Math.min(...heights));
    columns[target].push({ photo, index });
    heights[target] += photo.src.height / photo.src.width + CAPTION;
  });
  // najkrótsza kolumna dostaje notkę na końcu, jeśli zostaje w niej wyraźna dziura
  const shortest = heights.indexOf(Math.min(...heights));
  const gap = Math.max(...heights) - heights[shortest];
  return { columns, noteIn: cols > 1 && gap > 0.35 ? shortest : -1 };
}

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const cols = useColumns();
  const thumbs = useRef(new Map<number, HTMLButtonElement>());

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter],
  );
  const { columns, noteIn } = useMemo(() => distribute(visible, cols), [visible, cols]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: photos.length, slub: 0, portret: 0, rodzina: 0 };
    for (const p of photos) c[p.category]++;
    return c;
  }, []);

  // Skróty z hero (#sluby, #portrety, #rodzinne) ustawiają filtr
  useEffect(() => {
    const sync = () => {
      const f = anchorToFilter[window.location.hash.slice(1)];
      if (f) setFilter(f);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    const anchor = f === "all" ? "portfolio" : categories.find((c) => c.id === f)!.anchor;
    window.history.replaceState(null, "", `#${anchor}`);
  };

  const close = useCallback(() => {
    const nr = lightboxIndex !== null ? visible[lightboxIndex]?.nr : undefined;
    setLightboxIndex(null);
    // fokus wraca do miniatury kadru, który był oglądany jako ostatni
    // (po zdjęciu "inert" z reszty strony, stąd krótkie opóźnienie)
    if (nr !== undefined) window.setTimeout(() => thumbs.current.get(nr)?.focus(), 60);
  }, [lightboxIndex, visible]);

  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "Wszystkie" }, ...categories];

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      {categories.map((c) => (
        <span key={c.anchor} id={c.anchor} aria-hidden className="absolute top-0" />
      ))}

      <SectionHead
        nr="02"
        label="Portfolio"
        id="portfolio-title"
        title={
          <>
            Wybrane kadry, <em className="text-sepia">które lubię najbardziej</em>
          </>
        }
        aside={
          <p className="max-w-sm leading-relaxed text-ink-soft">
            Każdy kadr ma swój numer, jak na stykówce. Kliknij, żeby obejrzeć
            go w pełnym rozmiarze; strzałkami przejdziesz dalej.
          </p>
        }
      />

      <div
        role="group"
        aria-label="Filtruj kategorie portfolio"
        className="mt-10 grid grid-cols-2 gap-x-6 border-b border-line sm:flex sm:flex-wrap sm:gap-x-10"
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => choose(f.id)}
              aria-pressed={active}
              className={`caps relative flex min-h-12 cursor-pointer items-center gap-1.5 transition-colors duration-300 ${
                active ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {f.label}
              <span className="tabular font-serif text-[0.8rem] normal-case italic tracking-normal text-sepia">
                {counts[f.id]}
              </span>
              {active && (
                <motion.span
                  layoutId={reduce ? undefined : "filtr"}
                  className="absolute inset-x-0 -bottom-px h-px bg-ink"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${filter}-${cols}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-x-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
        >
          {columns.map((column, ci) => (
            <div key={ci} className={`flex flex-col gap-y-10 ${cols === 3 && ci === 1 ? "lg:pt-20" : ""}`}>
              {column.map(({ photo, index }) => (
                <div key={photo.nr}>
                  <button
                    ref={(el) => {
                      if (el) thumbs.current.set(photo.nr, el);
                      else thumbs.current.delete(photo.nr);
                    }}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group block w-full cursor-zoom-in text-left"
                    aria-label={`Kadr ${String(photo.nr).padStart(3, "0")}: ${photo.title}, ${photo.place}. Otwórz podgląd`}
                  >
                    <div className="overflow-hidden bg-cream-deep">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                        placeholder="blur"
                        className="h-auto w-full transition-transform duration-[900ms] ease-[var(--ease-editorial)] motion-safe:group-hover:scale-[1.035]"
                      />
                    </div>
                    <span className="mt-3 grid grid-cols-[2.25rem_1fr] items-baseline gap-y-1">
                      <span className="caps tabular text-sepia">
                        {String(photo.nr).padStart(3, "0")}
                      </span>
                      <span className="font-serif text-[1.0625rem] italic leading-snug">
                        {photo.title}
                      </span>
                      <span className="caps col-start-2 text-ink-soft">{photo.place}</span>
                    </span>
                  </button>
                </div>
              ))}
              {ci === noteIn && (
                <aside className="border-t border-ink pt-4">
                  <p className="caps text-sepia">Ciąg dalszy</p>
                  <p className="mt-3 font-serif text-2xl italic leading-snug">
                    Więcej kadrów i całe historie pokazuję na Instagramie.
                  </p>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caps mt-4 inline-flex min-h-11 items-center"
                  >
                    <span className="link-line">@{site.instagram}</span>
                  </a>
                </aside>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        photos={visible}
        index={lightboxIndex}
        onClose={close}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
