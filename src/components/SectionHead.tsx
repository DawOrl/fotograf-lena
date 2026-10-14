import Reveal from "@/components/Reveal";

type Props = {
  nr: string;
  label: string;
  title: React.ReactNode;
  /** treść po prawej stronie nagłówka (np. krótki wstęp) */
  aside?: React.ReactNode;
  id?: string;
};

export default function SectionHead({ nr, label, title, aside, id }: Props) {
  return (
    <Reveal>
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <p className="caps flex items-center gap-3 text-sepia">
          <span className="tabular">{nr}</span>
          <span aria-hidden className="h-px w-8 bg-sepia" />
          <span>{label}</span>
        </p>
        <p
          aria-hidden
          className="tabular font-serif text-5xl leading-none text-ink/[0.07] sm:text-7xl"
        >
          {nr}
        </p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2
          id={id}
          className="font-serif text-[2.5rem] leading-[1.08] tracking-[-0.015em] sm:text-5xl lg:col-span-7 lg:text-[3.5rem]"
        >
          {title}
        </h2>
        {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
      </div>
    </Reveal>
  );
}
