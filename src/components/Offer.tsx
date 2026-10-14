import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import PackageLink from "@/components/PackageLink";
import { filmStill, pakiety } from "@/data/content";

export default function Offer() {
  return (
    <section
      id="oferta"
      aria-labelledby="oferta-title"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHead
        nr="04"
        label="Oferta"
        id="oferta-title"
        title={
          <>
            Trzy pakiety, <em className="text-sepia">zero gwiazdek</em> w cenniku
          </>
        }
      />

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-ink-soft">
            Każda historia jest inna, dlatego ceny zaczynają się „od”. Ostateczną
            wycenę przygotowuję po krótkiej rozmowie. Dojazd po Krakowie zawsze
            w cenie.
          </p>
        </Reveal>
        {/* Martwa natura z Blendera: kasety 35 mm, wątek filmu analogowego z sekcji o mnie */}
        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <Image
            src={filmStill}
            alt=""
            sizes="(max-width: 1024px) 90vw, 44vw"
            className="mx-auto h-auto w-full max-w-xl lg:-my-10"
          />
        </Reveal>
      </div>

      <ol className="mt-12 lg:mt-16">
        {pakiety.map((p, i) => (
          <li key={p.nr}>
            <Reveal delay={i * 0.08}>
              <article className="group grid gap-x-6 gap-y-4 border-t border-line py-9 transition-colors duration-500 hover:bg-cream-deep sm:grid-cols-12 sm:items-baseline sm:px-4 sm:py-10">
                <p aria-hidden className="tabular font-serif text-2xl italic text-sepia sm:col-span-1">
                  {p.nr}
                </p>
                <div className="sm:col-span-4 lg:col-span-3">
                  <h3 className="font-serif text-3xl sm:text-4xl">{p.name}</h3>
                  <p className="mt-1 font-serif italic text-ink-soft">{p.sub}</p>
                </div>
                <ul className="space-y-2 text-ink-soft sm:col-span-7 lg:col-span-5">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-sepia-light" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between gap-4 sm:col-span-12 sm:col-start-2 lg:col-span-3 lg:col-start-auto lg:flex-col lg:items-end">
                  <p className="tabular font-serif text-2xl sm:text-3xl">
                    <span className="mr-1.5 text-base italic text-ink-soft">od</span>
                    {p.price}
                  </p>
                  <PackageLink name={p.name}>Zapytaj o ten pakiet</PackageLink>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="border-t border-line" />
    </section>
  );
}
