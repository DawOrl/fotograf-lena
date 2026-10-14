import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import KineticTitle from "@/components/KineticTitle";
import { categories, heroImage, photos, site } from "@/data/content";
import { kadry } from "@/lib/plural";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 sm:pt-12 lg:pb-28"
    >
      {/* Pionowa notka na marginesie, jak grzbiet magazynu */}
      <p
        aria-hidden
        className="caps absolute right-1.5 top-14 hidden text-ink-soft xl:block"
        style={{ writingMode: "vertical-rl" }}
      >
        ślub · portret · rodzina · {site.city}
      </p>

      <div className="grid gap-y-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto] lg:gap-x-8 lg:gap-y-12">
        {/* Tytuł */}
        <div className="lg:col-span-7 lg:row-start-2 lg:self-end">
          <Reveal>
            <p className="caps text-sepia">Nº 1 · fotografia, która zostaje</p>
          </Reveal>
          <KineticTitle id="hero-title" />
        </div>

        {/* Kadr w łuku */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1">
          <Reveal delay={0.1}>
            <figure>
              <ParallaxImage
                src={heroImage}
                alt="Bukiet panny młodej z białymi tulipanami i paprocią na tle ciemnego garnituru, pod światło"
                sizes="(max-width: 1024px) 92vw, 40vw"
                preload
                develop
                drift={40}
                className="arch aspect-[4/5] w-full lg:max-h-[min(40rem,calc(100svh-10rem))]"
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-ink-soft">
                <span className="caps tabular">Kadr 001</span>
                <span className="font-serif italic">bukiet panny młodej, sierpień</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Wstęp i wezwania */}
        <div className="lg:col-span-6 lg:row-start-3">
          <Reveal delay={0.35}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
              Reportaże ślubne i portrety pisane światłem. Bez pozowania,
              w ciepłych tonach analogowego filmu.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#kontakt" className="btn-ink caps">
                Zapytaj o termin
              </a>
              <a href="#portfolio" className="caps flex min-h-11 items-center">
                <span className="link-line">Zobacz portfolio</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Spis treści numeru: skróty do kategorii galerii */}
        <nav
          aria-label="W tym numerze"
          className="lg:col-span-6 lg:row-start-1 lg:self-start"
        >
          <Reveal delay={0.2}>
            <p className="caps text-ink-soft">W tym numerze</p>
            <ol className="mt-3 border-t border-line">
              {categories.map((c, i) => {
                const count = photos.filter((p) => p.category === c.id).length;
                return (
                  <li key={c.id} className="border-b border-line">
                    <a
                      href={`#${c.anchor}`}
                      className="group grid min-h-12 grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 py-2.5 sm:grid-cols-[2.5rem_auto_1fr_auto]"
                    >
                      <span className="caps tabular text-sepia">0{i + 1}</span>
                      <span className="font-serif text-xl transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1 sm:text-2xl">
                        {c.label}
                      </span>
                      <span className="hidden font-serif italic text-ink-soft sm:block">
                        {c.note}
                      </span>
                      <span className="caps tabular text-ink-soft">
                        {count} {kadry(count)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </nav>
      </div>
    </section>
  );
}
