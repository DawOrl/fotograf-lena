import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import SectionHead from "@/components/SectionHead";
import { oMnie, portraitImage } from "@/data/content";

export default function About() {
  return (
    <section id="o-mnie" className="bg-cream-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          nr="03"
          label="O mnie"
          title={
            <>
              <em className="text-sepia">{oMnie.heading}</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <figure>
                <ParallaxImage
                  src={portraitImage}
                  alt="Portret Leny Czarneckiej, fotografki"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="arch aspect-[4/5] w-full"
                  drift={36}
                />
                <figcaption className="mt-3 flex justify-between text-ink-soft">
                  <span className="caps">Autoportret</span>
                  <span className="font-serif italic">Kraków, zima</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <p className="dropcap max-w-xl text-lg leading-relaxed text-ink-soft">
                {oMnie.paragraphs[0]}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                {oMnie.paragraphs[1]}
              </p>
              <p className="mt-8 font-serif text-3xl italic text-sepia">
                — Lena
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {oMnie.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="caps order-2 mt-2 text-ink-soft">{f.label}</dt>
                    <dd className="font-serif text-3xl sm:text-4xl">{f.value}</dd>
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
