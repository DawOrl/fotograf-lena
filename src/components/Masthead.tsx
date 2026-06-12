import { site } from "@/data/content";

const links = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Masthead() {
  return (
    <header className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
      <div className="caps flex items-baseline justify-between pb-3 text-ink">
        <p className="hidden sm:block">{site.city}, Polska</p>
        <p className="font-serif normal-case tracking-normal text-base italic">
          Lena Czarnecka <span className="not-italic">·</span> fotografia
        </p>
        <p className="hidden sm:block">est. {site.est}</p>
      </div>
      <div className="rule-double" />
      <nav
        aria-label="Nawigacja główna"
        className="caps flex justify-center gap-7 py-3 sm:gap-12"
      >
        {links.map((l) => (
          <a key={l.href} href={l.href} className="link-line">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-line" />
    </header>
  );
}
