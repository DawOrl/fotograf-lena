"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/data/content";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Tab") {
        // Focus trap: cycle through the dialog's focusable controls
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button, [href]"
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Podgląd zdjęcia: ${photo.title}`}
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reduce ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-50 flex flex-col bg-cream/[0.985] backdrop-blur-sm"
          onClick={onClose}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (dx > 60) prev();
            if (dx < -60) next();
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="caps text-ink-soft">
              {String(index + 1).padStart(2, "0")} / {photos.length}
            </p>
            <button
              onClick={onClose}
              className="link-line caps cursor-pointer"
              aria-label="Zamknij podgląd"
            >
              Zamknij — esc
            </button>
          </div>

          <div className="relative flex-1 px-5 sm:px-20">
            <motion.div
              key={photo.src.src}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                className="object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 cursor-pointer p-4 font-serif text-3xl transition-transform duration-300 hover:-translate-x-1 sm:block"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Następne zdjęcie"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 cursor-pointer p-4 font-serif text-3xl transition-transform duration-300 hover:translate-x-1 sm:block"
            >
              →
            </button>
          </div>

          <div
            className="flex items-baseline justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-lg italic">{photo.title}</p>
            <p className="caps text-ink-soft">{photo.place}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
