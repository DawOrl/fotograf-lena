import Reveal from "@/components/Reveal";

type Props = {
  nr: string;
  label: string;
  title: React.ReactNode;
};

export default function SectionHead({ nr, label, title }: Props) {
  return (
    <Reveal>
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <p className="caps text-sepia">
          {nr} — {label}
        </p>
        <p
          aria-hidden
          className="font-serif text-5xl leading-none text-ink/[0.08] sm:text-7xl"
        >
          {nr}
        </p>
      </div>
      <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
    </Reveal>
  );
}
