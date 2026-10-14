import { site } from "@/data/content";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Masthead() {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-5 sm:px-8 sm:pt-6">
      <a
        href="#tresc"
        className="caps sr-only z-50 bg-ink px-4 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Przejdź do treści
      </a>
      <div className="caps flex items-baseline justify-between pb-3 text-ink">
        <p className="hidden sm:block">{site.city}, Polska</p>
        <p className="mx-auto font-serif text-[1.0625rem] normal-case italic tracking-normal sm:mx-0">
          Lena Czarnecka <span className="not-italic text-sepia">·</span> fotografia
        </p>
        <p className="tabular hidden sm:block">est. {site.est}</p>
      </div>
      <div className="rule-double" />
      <nav aria-label="Nawigacja główna" className="caps flex justify-between sm:justify-center sm:gap-12">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="flex min-h-11 items-center">
            <span className="link-line">{l.label}</span>
          </a>
        ))}
      </nav>
      <div className="border-t border-line" />
    </header>
  );
}
