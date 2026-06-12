import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { opinie } from "@/data/content";

export default function Testimonials() {
  return (
    <section
      aria-label="Opinie klientek i klientów"
      className="bg-cream-deep"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          nr="05"
          label="Opinie"
          title={
            <>
              Słowa, które <em className="text-sepia">znaczą więcej</em> niż
              portfolio
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {opinie.map((o, i) => (
            <Reveal key={o.author} delay={i * 0.1}>
              <blockquote
                className={`flex h-full flex-col ${i === 1 ? "lg:mt-16" : ""}`}
              >
                <p
                  aria-hidden
                  className="font-serif text-7xl leading-none text-sepia/30"
                >
                  „
                </p>
                <p className="font-serif text-xl italic leading-relaxed">
                  {o.quote}
                </p>
                <footer className="mt-6 flex items-baseline gap-3">
                  <span className="h-px w-8 bg-sepia" aria-hidden />
                  <div>
                    <p className="caps">{o.author}</p>
                    <p className="mt-1 font-serif italic text-ink-soft">
                      {o.context}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
