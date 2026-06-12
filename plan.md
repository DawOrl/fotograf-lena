# Lena Czarnecka Fotografia — jasne portfolio (demo)

Projekt autorski do biblioteki realizacji na **dorlowski.dev**.

## Cel demo

Cała obecna biblioteka (Zbychu, Bella, Glow, Craft Coffee, Asystent AI) jest
w ciemnej kolorystyce. To demo pokazuje **rozpiętość stylistyczną**: jasny,
minimalistyczny, „editorialowy" design — i domyka segment klientów kreatywnych
(fotografowie, makijażystki, styliści, architekci wnętrz), gdzie stronę
sprzedaje się obrazem, nie tekstem.

## Fikcyjny klient

**Lena Czarnecka** — fotografka ślubna i portretowa (Kraków). Klientki trafiają
z Instagrama; strona ma być „wizytówką premium": potwierdzić poziom, pokazać
pełne portfolio i zebrać zapytania o terminy.

## Koncept wizualny

- **Galeria jest bohaterem** — minimum UI, maksimum zdjęć (Unsplash/Pexels:
  wedding, portrait; spójna, ciepła tonacja).
- Białe/kremowe tło (`#FAF8F5`), czarna typografia, **serif w nagłówkach**
  (np. Playfair Display / Fraunces przez `next/font`, koniecznie `latin-ext`),
  sans-serif w body. Dużo światła i odstępów.
- Delikatne animacje: fade + parallax obrazów w maskach, hover z łagodnym
  zoomem; żadnych neonów, gradientów ani glow.
- Editorial detale: wielkie inicjały/numeracja serii, kursywa w akcentach,
  podpisy zdjęć jak w magazynie.

## Struktura

1. **Hero** — pełnoekranowe zdjęcie (lub kolaż 2–3 kadrów), nazwisko serifem,
   jednozdaniowe pozycjonowanie, CTA „Zobacz portfolio" / „Zapytaj o termin".
2. **Portfolio / galeria** — siatka **masonry** z filtrowaniem kategorii
   (Śluby · Portrety · Rodzinne); klik otwiera **lightbox** (klawiatura: ←/→/Esc).
3. **O mnie** — portret + krótka historia (1–2 akapity), podejście do pracy.
4. **Oferta / pakiety** — 3 pakiety (Portret / Ślub / Rozszerzony) z cenami „od".
5. **Opinie** — 2–3 cytaty klientek, kursywą, z imieniem.
6. **Kontakt** — formularz (imię, e-mail, data wydarzenia, wiadomość) + Instagram.
7. **Stopka** — minimalna.

## Funkcjonalności kluczowe

- Masonry grid (CSS columns lub grid z `row-span`) + filtrowanie bez przeładowania.
- Lightbox: focus trap, obsługa klawiatury, gesty swipe na mobile,
  `next/image` z `sizes` (galeria musi ładować się szybko mimo dużych zdjęć).
- Lazy loading + blur placeholder dla wszystkich kadrów.
- `prefers-reduced-motion` respektowane (animacje wyłączane).

## Stack (spójny z resztą demo)

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion ·
TypeScript. Deploy: Vercel. Repo: GitHub (`DawOrl/fotograf-lena`).

## Kroki wdrożenia

1. `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir`
2. Theme jasny w `globals.css`; fonty serif+sans przez `next/font` (latin-ext).
3. Dane (kategorie, zdjęcia, pakiety, opinie) w `src/data/content.ts`;
   zdjęcia do `public/gallery/` (zoptymalizowane, max ~300 KB/szt.).
4. Galeria + lightbox jako oddzielne komponenty klienckie; reszta sekcji statyczna.
5. SEO: metadata, OG ze zdjęciem hero, JSON-LD `Person`/`LocalBusiness`.
6. Test responsywności 375/768/1440 + Lighthouse (obrazy!).
7. Deploy na Vercel + repo GitHub.

## Definicja ukończenia (publikacja w bibliotece)

- [ ] Live na Vercelu, repo na GitHubie
- [ ] Wpis w `portfolio_web/scripts/shots.config.json` + `npm run shots fotograf-lena`
- [ ] Kompresja PNG (sharp)
- [ ] Obiekt projektu w `cv-data.ts` (kategoria: **Portfolio / strona wizerunkowa**,
      kind: demo, problem/solution/result, stack, scope, liveUrl, githubUrl)
