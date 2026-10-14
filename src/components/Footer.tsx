import Reveal from "@/components/Reveal";
import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-serif text-6xl italic leading-none tracking-tight sm:text-8xl">
              Do zobaczenia<span className="text-sepia">.</span>
            </p>
            <a href="#kontakt" className="btn-ink caps self-start sm:self-auto">
              Zapytaj o termin
            </a>
          </div>
        </Reveal>
        <div className="caps mt-14 flex flex-col gap-3 border-t border-line pt-5 text-ink-soft md:flex-row md:items-baseline md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.tagline}, {site.city}
          </p>
          <p className="normal-case tracking-normal">
            Projekt demonstracyjny. Zdjęcia:{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line"
            >
              Unsplash
            </a>{" "}
            oraz kadry wygenerowane na potrzeby demo.
          </p>
        </div>
      </div>
    </footer>
  );
}
