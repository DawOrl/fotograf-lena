import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { opinie } from "@/data/content";

export default function Testimonials() {
  const [lead, ...rest] = opinie;

  return (
    <section aria-labelledby="opinie-title" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          nr="05"
          label="Opinie"
          id="opinie-title"
          title={
            <>
              Słowa, które <em className="text-sepia">znaczą więcej</em> niż portfolio
            </>
          }
        />

        <div className="mt-14 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <figure>
              <blockquote>
                <p className="-indent-[0.45em] font-serif text-2xl italic leading-[1.45] sm:text-[2.125rem] sm:leading-[1.38]">
                  „{lead.quote}”
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-sepia" />
                <span>
                  <span className="caps block">{lead.author}</span>
                  <span className="mt-1 block font-serif italic text-ink-soft">{lead.context}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-12 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-line lg:pl-8">
            {rest.map((o, i) => (
              <Reveal key={o.author} delay={0.1 + i * 0.1}>
                <figure>
                  <blockquote>
                    <p className="font-serif text-xl italic leading-relaxed">„{o.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-4">
                    <span aria-hidden className="h-px w-8 bg-sepia" />
                    <span>
                      <span className="caps block">{o.author}</span>
                      <span className="mt-1 block font-serif italic text-ink-soft">{o.context}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
