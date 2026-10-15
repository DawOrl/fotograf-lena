"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/data/content";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const noop = () => () => {};

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(0);
  // koniec przeciągania: przez chwilę ignorujemy klik w tło, żeby szybki swipe nie zamknął podglądu
  const dragEndedAt = useRef(0);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDirection(step);
      onNavigate((index + step + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate],
  );

  // Klawiatura: strzałki, Home/End, Esc. Handler w refie, żeby efekt nie odpalał się przy każdej zmianie kadru.
  const keyHandler = useRef<(e: KeyboardEvent) => void>(() => {});
  useEffect(() => {
    keyHandler.current = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Home") {
        setDirection(-1);
        onNavigate(0);
      } else if (e.key === "End") {
        setDirection(1);
        onNavigate(photos.length - 1);
      } else return;
      e.preventDefault();
    };
  });

  // Otwarcie: blokada przewijania, reszta strony "inert" (prawdziwa pułapka fokusu), fokus na Zamknij
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => keyHandler.current(e);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const others = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.contains(dialog) && !el.inert,
    );
    others.forEach((el) => (el.inert = true));
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      others.forEach((el) => (el.inert = false));
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragEndedAt.current = performance.now();
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -70) go(1);
    else if (swipe > 70) go(-1);
  };

  if (!mounted) return null;

  const prevPhoto = open ? photos[(index - 1 + photos.length) % photos.length] : null;
  const nextPhoto = open ? photos[(index + 1) % photos.length] : null;
  const slide = reduce ? 0 : 56;

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-50 flex flex-col bg-cream/[0.985] backdrop-blur-md"
        >
          {/* Górny pasek */}
          <div className="flex items-center justify-between px-5 pt-3 sm:px-8 sm:pt-4">
            <p className="caps tabular text-ink-soft" aria-hidden>
              {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="caps flex min-h-11 cursor-pointer items-center gap-3"
            >
              <span className="link-line">Zamknij</span>
              <kbd className="hidden border border-line px-1.5 py-0.5 font-sans text-[0.625rem] text-ink-soft sm:inline">
                Esc
              </kbd>
            </button>
          </div>

          {/* Scena: klik poza zdjęciem zamyka */}
          <div
            className="relative min-h-0 flex-1"
            onClick={() => {
              if (performance.now() - dragEndedAt.current > 200) onClose();
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={photo.nr}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * slide }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -slide }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduce ? 0 : 0.45, ease }}
                className="absolute inset-0 flex items-center justify-center px-5 sm:px-24"
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    sizes="100vw"
                    placeholder="blur"
                    draggable={false}
                    className="h-auto max-h-[calc(100svh-9.5rem)] w-auto max-w-[calc(100vw-2.5rem)] select-none sm:max-w-[calc(100vw-12rem)]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Poprzedni kadr"
              className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center font-serif text-3xl transition-transform duration-300 hover:-translate-x-1 sm:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Następny kadr"
              className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center font-serif text-3xl transition-transform duration-300 hover:translate-x-1 sm:flex"
            >
              →
            </button>
          </div>

          {/* Podpis i sterowanie na telefonie */}
          <div className="flex items-center justify-between gap-4 px-5 pb-4 pt-3 sm:items-baseline sm:px-8 sm:pb-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Poprzedni kadr"
              className="flex h-11 w-11 shrink-0 items-center justify-center font-serif text-2xl sm:hidden"
            >
              ←
            </button>
            <div className="min-w-0 text-center sm:flex sm:flex-1 sm:items-baseline sm:justify-between sm:text-left">
              <p id="lightbox-title" className="font-serif text-lg italic leading-snug">
                <span className="caps tabular mr-3 not-italic text-sepia">
                  {String(photo.nr).padStart(3, "0")}
                </span>
                {photo.title}
              </p>
              <p className="caps mt-1 text-ink-soft sm:mt-0">{photo.place}</p>
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Następny kadr"
              className="flex h-11 w-11 shrink-0 items-center justify-center font-serif text-2xl sm:hidden"
            >
              →
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            Kadr {index + 1} z {photos.length}: {photo.title}, {photo.place}
          </p>

          {/* Sąsiednie kadry ładują się zawczasu, żeby przewijanie było natychmiastowe */}
          <div aria-hidden className="sr-only">
            {[prevPhoto, nextPhoto].map(
              (p) =>
                p && (
                  <Image key={p.nr} src={p.src} alt="" sizes="100vw" loading="eager" />
                ),
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
