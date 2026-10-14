"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { PACKAGE_EVENT } from "@/components/PackageLink";
import { pakiety, site } from "@/data/content";

type Field = "imie" | "email" | "wiadomosc";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const imie = String(data.get("imie") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const wiadomosc = String(data.get("wiadomosc") ?? "").trim();
  if (!imie) errors.imie = "Podaj imię, żebym wiedziała, jak się zwracać.";
  if (!email) errors.email = "Podaj adres e-mail, na który odpiszę.";
  else if (!EMAIL.test(email)) errors.email = "Ten adres wygląda na niepełny, sprawdź go.";
  if (wiadomosc.length < 10) errors.wiadomosc = "Napisz kilka słów o planach (co najmniej 10 znaków).";
  return errors;
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [pakiet, setPakiet] = useState("");
  const [name, setName] = useState("");
  const thanksRef = useRef<HTMLHeadingElement>(null);

  // "Zapytaj o ten pakiet" w ofercie ustawia pole Pakiet
  useEffect(() => {
    const onPick = (e: Event) => setPakiet((e as CustomEvent<string>).detail);
    window.addEventListener(PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(PACKAGE_EVENT, onPick);
  }, []);

  useEffect(() => {
    if (status === "sent") thanksRef.current?.focus();
  }, [status]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    setTried(true);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setName(String(data.get("imie")).trim().split(/\s+/)[0]);
    setStatus("sending");
    // wersja demo: brak backendu, krótka pauza tylko po to, żeby pokazać stan wysyłania
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const revalidate = (e: { currentTarget: { form: HTMLFormElement | null } }) => {
    const form = e.currentTarget.form;
    if (tried && form) setErrors(validate(new FormData(form)));
  };

  const fieldProps = (field: Field) => ({
    id: field,
    name: field,
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-blad` : undefined,
    onBlur: revalidate,
    onChange: revalidate,
  });

  const error = (field: Field) =>
    errors[field] ? (
      <p id={`${field}-blad`} className="mt-2 text-sm text-[#9a3b2a]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-title"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
    >
      <SectionHead
        nr="06"
        label="Kontakt"
        id="kontakt-title"
        title={
          <>
            Zarezerwuj <em className="text-sepia">swój termin</em>
          </>
        }
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="max-w-sm leading-relaxed text-ink-soft">
              Sezon ślubny rezerwuję zwykle z 12–18-miesięcznym wyprzedzeniem,
              ale zawsze warto zapytać, bo czasem terminy się zwalniają. Na
              wiadomości odpisuję w ciągu 48 godzin.
            </p>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              <div className="py-4">
                <dt className="caps text-ink-soft">E-mail</dt>
                <dd className="mt-1 font-serif text-xl">
                  <a href={`mailto:${site.email}`} className="link-line break-all">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="caps text-ink-soft">Instagram</dt>
                <dd className="mt-1 font-serif text-xl italic">
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line"
                  >
                    @{site.instagram}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="caps text-ink-soft">Pracownia</dt>
                <dd className="mt-1 font-serif text-xl">{site.city}, Podgórze</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="border border-line px-6 py-12 text-center sm:px-12" aria-live="polite">
                <h3
                  ref={thanksRef}
                  tabIndex={-1}
                  className="font-serif text-4xl italic text-sepia outline-none"
                >
                  Dziękuję{name ? `, ${name}` : ""}.
                </h3>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
                  Wiadomość jest u mnie. Odezwę się najpóźniej pojutrze, zwykle
                  szybciej.
                </p>
                <p className="caps mt-6 text-ink-soft">
                  Wersja demo: formularz niczego nie wysyła
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setTried(false);
                    setErrors({});
                    setPakiet("");
                  }}
                  className="caps mt-8 inline-flex min-h-11 cursor-pointer items-center"
                >
                  <span className="link-line">Napisz jeszcze raz</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="grid gap-x-8 gap-y-9 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="imie" className="caps text-ink-soft">
                    Imię i nazwisko <span aria-hidden>*</span>
                  </label>
                  <input
                    {...fieldProps("imie")}
                    type="text"
                    autoComplete="name"
                    placeholder="Twoje imię"
                    className="field mt-2"
                  />
                  {error("imie")}
                </div>
                <div>
                  <label htmlFor="email" className="caps text-ink-soft">
                    E-mail <span aria-hidden>*</span>
                  </label>
                  <input
                    {...fieldProps("email")}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="adres@przyklad.pl"
                    className="field mt-2"
                  />
                  {error("email")}
                </div>
                <div>
                  <label htmlFor="pakiet" className="caps text-ink-soft">
                    Pakiet
                  </label>
                  <select
                    id="pakiet"
                    name="pakiet"
                    value={pakiet}
                    onChange={(e) => setPakiet(e.target.value)}
                    className="field mt-2"
                  >
                    <option value="">Jeszcze nie wiem</option>
                    {pakiety.map((p) => (
                      <option key={p.nr} value={p.name}>
                        {p.name}, {p.sub}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="data" className="caps text-ink-soft">
                    Data wydarzenia <span className="normal-case tracking-normal">(jeśli znana)</span>
                  </label>
                  <input id="data" name="data" type="date" className="field mt-2" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="wiadomosc" className="caps text-ink-soft">
                    Wiadomość <span aria-hidden>*</span>
                  </label>
                  <textarea
                    {...fieldProps("wiadomosc")}
                    rows={4}
                    placeholder="Opowiedz mi o swoich planach…"
                    className="field mt-2 resize-none"
                  />
                  {error("wiadomosc")}
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-ink caps cursor-pointer disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? "Wysyłam…" : "Wyślij zapytanie"}
                  </button>
                  <p className="text-sm text-ink-soft">
                    Odpowiadam w ciągu 48 godzin.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
