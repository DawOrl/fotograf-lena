import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { pakiety } from "@/data/content";

export default function Offer() {
  return (
    <section id="oferta" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        nr="04"
        label="Oferta"
        title={
          <>
            Trzy pakiety, <em className="text-sepia">zero gwiazdek</em> w cenniku
          </>
        }
      />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-ink-soft">
          Każda historia jest inna, dlatego ceny zaczynają się „od” — ostateczną
          wycenę przygotowuję po krótkiej rozmowie. Dojazd po Krakowie zawsze
          w cenie.
        </p>
      </Reveal>

      <div className="mt-14">
        {pakiety.map((p, i) => (
          <Reveal key={p.nr} delay={i * 0.08}>
            <article className="group grid gap-4 border-t border-line py-10 transition-colors duration-500 last:border-b hover:bg-cream-deep sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-4">
              <p
                aria-hidden
                className="font-serif text-4xl text-ink/[0.15] transition-colors duration-500 group-hover:text-sepia sm:col-span-1"
              >
                {p.nr}
              </p>
              <div className="sm:col-span-3">
                <h3 className="font-serif text-3xl">{p.name}</h3>
                <p className="mt-1 font-serif italic text-ink-soft">{p.sub}</p>
              </div>
              <ul className="space-y-1.5 text-ink-soft sm:col-span-5">
                {p.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="sm:col-span-3 sm:text-right">
                <p className="font-serif text-2xl">{p.price}</p>
                <a href="#kontakt" className="link-line caps mt-2 inline-block text-sepia">
                  Zapytaj o termin
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
