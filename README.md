# Lena Czarnecka — Fotografia

> Demo do portfolio — **jasna, editorialowa strona-wizytówka dla fotografki ślubnej i portretowej**.
> Pokazuje rozpiętość stylistyczną biblioteki realizacji: zamiast ciemnych neonów — światło,
> serif i układ inspirowany rozkładówką magazynu.

Fikcyjna fotografka „Lena Czarnecka" (Kraków): pełnoekranowe portfolio z filtrowaniem
i lightboxem, sekcja o mnie, redakcyjny cennik, opinie i formularz zapytań o termin.

## Koncept wizualny

Strona jest złożona jak **rozkładówka magazynu ślubnego**, nie jak typowy landing:

- gazetowy **masthead** z podwójną linią zamiast sticky navbara,
- asymetryczne hero: wielki serif + zdjęcie w **łukowej masce** z parallaksą + pionowy tekst na marginesie,
- numerowane sekcje (`02 — Portfolio`) z „duchowymi" numerami w tle,
- podpisy zdjęć jak w magazynie (`001 · Marta & Jan — Taormina`),
- oferta jako **redakcyjny cennik z cienkimi liniami** zamiast trzech kart,
- jasny, kremowy **lightbox** (`#FAF8F5`) zamiast czarnego overlay,
- inicjał (drop cap) w sekcji o mnie, kursywa w akcentach, jeden sepiowy akcent kolorystyczny.

Typografia: **Fraunces** (serif, nagłówki, `latin-ext`) + **Jost** (sans, body) przez `next/font`.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** (design system w `@theme`)
- **framer-motion** — fade/parallax/layout animations, wszystkie z poszanowaniem `prefers-reduced-motion`
- **next/image** — statyczne importy z automatycznym `blurDataURL`, `sizes` pod masonry

## Funkcje

- **Galeria masonry** (CSS columns) z filtrowaniem kategorii (Śluby · Portrety · Rodzinne)
  bez przeładowania, z animacją układu przy zmianie filtra.
- **Lightbox** — focus trap, klawiatura (`←`/`→`/`Esc`), gesty swipe na mobile,
  licznik i podpisy kadrów.
- **Parallax w maskach** — zdjęcia hero i portret „płyną" w łukowych maskach przy scrollu.
- Lazy loading + blur placeholder dla wszystkich kadrów (zdjęcia ≤ ~300 KB).
- SEO: metadata + OpenGraph, JSON-LD (`Person` + `LocalBusiness`), `sitemap.xml`, `robots.txt`.
- Dostępność: semantyczne sekcje, `aria-*`, widoczny fokus, `prefers-reduced-motion`.

## Szybki start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build produkcyjny:

```bash
npm run build
npm run start
```

## Struktura

```
src/
  app/          # layout (metadata, JSON-LD), page, fonty, globals.css
  components/   # Masthead, Hero, Gallery, Lightbox, About, Offer, …
  data/         # content.ts — zdjęcia, pakiety, opinie (jedno źródło treści)
public/gallery/ # zoptymalizowane kadry (Unsplash)
```

---

Projekt demonstracyjny — wszystkie dane (nazwisko, ceny, opinie) są fikcyjne.
Zdjęcia: [Unsplash](https://unsplash.com) (licencja Unsplash).
