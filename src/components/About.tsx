import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import SectionHead from "@/components/SectionHead";
import { oMnie, portraitImage } from "@/data/content";

export default function About() {
  return (
    <section id="o-mnie" aria-labelledby="o-mnie-title" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          nr="03"
          label="O mnie"
          id="o-mnie-title"
          wide
          title={<em className="text-sepia">{oMnie.heading}</em>}
        />

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <figure className="mx-auto max-w-md lg:max-w-none">
                <ParallaxImage
                  src={portraitImage}
                  alt="Lena Czarnecka przy oknie z lnianą zasłoną unosi do oka analogowy aparat dalmierzowy"
                  sizes="(max-width: 1024px) 90vw, 36vw"
                  className="arch aspect-[4/5] w-full"
                  drift={32}
                />
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-ink-soft">
                  <span className="caps">W pracowni</span>
                  <span className="font-serif italic">Kraków, Podgórze</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <Reveal delay={0.1}>
              <p className="dropcap max-w-[34rem] text-lg leading-[1.7] text-ink-soft">
                {oMnie.paragraphs[0]}
              </p>
              <p className="mt-6 max-w-[34rem] text-lg leading-[1.7] text-ink-soft">
                {oMnie.paragraphs[1]}
              </p>
              <p className="mt-9 flex items-center gap-4 font-serif text-3xl italic text-sepia">
                <span aria-hidden className="h-px w-10 bg-sepia" />
                Lena
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-ink pt-6 sm:gap-8">
                {oMnie.facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse gap-2">
                    <dt className="caps text-ink-soft">{f.label}</dt>
                    <dd className="tabular whitespace-nowrap font-serif text-[1.75rem] leading-none sm:text-5xl">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
