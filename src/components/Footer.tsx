import Reveal from "@/components/Reveal";
import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <Reveal>
          <p className="font-serif text-5xl italic tracking-tight sm:text-7xl">
            Do zobaczenia<span className="text-sepia">.</span>
          </p>
        </Reveal>
        <div className="caps mt-12 flex flex-col gap-3 text-ink-soft sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.tagline},{" "}
            {site.city}
          </p>
          <p>
            Strona demo — zdjęcia:{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
