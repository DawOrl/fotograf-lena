# Lena Czarnecka · Fotografia

> Demo do portfolio: **jasna, editorialowa strona-wizytówka dla fotografki ślubnej i portretowej**.
> Pokazuje rozpiętość stylistyczną biblioteki realizacji: zamiast ciemnych neonów światło,
> serif i układ inspirowany rozkładówką magazynu.

Fikcyjna fotografka „Lena Czarnecka” (Kraków): portfolio z filtrowaniem i lightboxem,
sekcja o mnie, redakcyjny cennik, opinie i formularz zapytań o termin.

## Koncept wizualny

Strona jest złożona jak **numer magazynu ślubnego**, nie jak typowy landing:

- gazetowa **winieta** z podwójną linią zamiast przyklejonego paska nawigacji,
- hero ze **spisem numeru** (Śluby, Portrety, Rodzinne: skróty prosto do filtrów galerii),
  wielkim serifem i kadrem w **łukowej masce**, który przy wejściu „wywołuje się” z bladego obrazu,
- numerowane sekcje (`02 · Portfolio`) z „duchowymi” numerami w tle,
- kadry z **numerami jak na stykówce** (`003 · Ania i Paweł: ostatni guzik`), stałymi przy filtrowaniu,
- oferta jako **redakcyjny cennik z cienkimi liniami** zamiast trzech kart,
- jasny, kremowy **lightbox** zamiast czarnego overlay,
- inicjał w sekcji o mnie, kursywa w akcentach, jeden sepiowy akcent kolorystyczny.

Typografia: **Fraunces** (serif, nagłówki, `latin-ext`) + **Jost** (sans, tekst) przez `next/font`.

## Zdjęcia: jedna seria, jedna gradacja

Fotograf sprzedaje obrazem, więc kadry muszą wyglądać jak praca jednej osoby.
Wszystkie przechodzą przez `scripts/grade-photos.mjs` (sharp): ciepłe światła,
lekko podniesione czernie, stonowane nasycenie i drobne ziarno, jak skan negatywu Portra 400,
z proporcjami ujednoliconymi do 4:5 i 3:2. Część kadrów pochodzi z Unsplash,
część została wygenerowana na potrzeby demo (twarze małe, z profilu albo poza kadrem).

Martwa natura z kasetami 35 mm w ofercie to render z Blendera, w całości proceduralny:
`scripts/blender/klisza.py` (scena) i `scripts/blender/wykoncz-render.mjs` (cień pod jasne tło).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** (tokeny w `@theme`)
- **framer-motion**: wejścia sekcji, paralaksa w maskach, przejścia lightboxa; wszystko wyłącza się przy `prefers-reduced-motion`
- **next/image**: statyczne importy WebP z automatycznym `blurDataURL` i `sizes` pod kolumny

## Funkcje

- **Galeria masonry** liczona w JS: każdy kadr trafia do najkrótszej kolumny, kolejność czytania zostaje,
  środkowa szpalta startuje niżej. Filtry bez przeładowania, z adresami `#sluby`, `#portrety`, `#rodzinne`.
- **Lightbox**: portal z resztą strony ustawioną jako `inert`, klawiatura (`←`/`→`/`Home`/`End`/`Esc`),
  przeciąganie myszą i swipe na telefonie, fokus wraca na oglądaną miniaturę, sąsiednie kadry ładują się zawczasu.
- **Formularz**: własne komunikaty walidacji, stan wysyłania, podziękowanie; „Zapytaj o ten pakiet”
  w ofercie wypełnia pole Pakiet. W wersji demo formularz niczego nie wysyła i mówi o tym wprost.
- SEO: metadata + OpenGraph, JSON-LD (`Person` + `LocalBusiness`), `sitemap.xml`, `robots.txt`.
- Dostępność: link do treści, semantyczne sekcje, widoczny fokus, cele dotyku min. 44 px, sepia przyciemniona do kontrastu AA.

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
  components/   # Masthead, Hero, Gallery, Lightbox, About, Offer, Contact…
  data/         # content.ts: zdjęcia, pakiety, opinie (jedno źródło treści)
public/gallery/ # kadry po gradacji (WebP)
public/render/  # render z Blendera (WebP z alfą)
scripts/        # gradacja zdjęć, scena Blendera i wykończenie renderu
```

---

Projekt demonstracyjny: wszystkie dane (nazwisko, ceny, opinie) są fikcyjne.
