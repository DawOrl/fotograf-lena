import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import { heroImage, site } from "@/data/content";

export default function Hero() {
  return (
    <section
      aria-label="Wstęp"
      className="relative mx-auto max-w-7xl px-5 pt-10 pb-20 sm:px-8 sm:pt-16 sm:pb-28"
    >
      {/* Vertical margin note, like a magazine spine */}
      <p
        aria-hidden
        className="caps absolute right-1 top-24 hidden text-ink-soft lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        ślub · portret · rodzina — {site.city} {new Date().getFullYear()}
      </p>

      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="caps text-sepia">
              Nº 1 — fotografia, która zostaje
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-[15vw] leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]">
              Lena
              <span className="block">
                Czarnecka
                <span className="ml-4 align-middle font-serif text-[0.32em] italic tracking-normal text-sepia">
                  fotografka
                </span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              Reportaże ślubne i portrety pisane światłem — bez pozowania,
              w ciepłych tonach analogowego filmu.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <a href="#portfolio" className="link-line caps">
                Zobacz portfolio&ensp;↓
              </a>
              <a
                href="#kontakt"
                className="caps border border-ink px-6 py-3 transition-colors duration-300 hover:bg-ink hover:text-cream"
              >
                Zapytaj o termin
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <figure>
              <ParallaxImage
                src={heroImage}
                alt="Para młoda z bukietem w złotym świetle zachodzącego słońca"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="arch aspect-[4/5] w-full"
              />
              <figcaption className="mt-3 flex justify-between text-ink-soft">
                <span className="caps">Kadr 001</span>
                <span className="font-serif italic">
                  bukiet panny młodej, sierpień
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
