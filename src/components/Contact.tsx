"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { site } from "@/data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        nr="06"
        label="Kontakt"
        title={
          <>
            Zarezerwuj <em className="text-sepia">swój termin</em>
          </>
        }
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="max-w-sm leading-relaxed text-ink-soft">
              Sezon ślubny rezerwuję zwykle z 12–18-miesięcznym wyprzedzeniem,
              ale zawsze warto zapytać — czasem terminy się zwalniają. Na
              wiadomości odpisuję w ciągu 48 godzin.
            </p>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="caps text-ink-soft">E-mail</dt>
                <dd className="mt-1 font-serif text-xl">
                  <a href={`mailto:${site.email}`} className="link-line">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
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
              <div>
                <dt className="caps text-ink-soft">Pracownia</dt>
                <dd className="mt-1 font-serif text-xl">
                  {site.city}, Podgórze
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            {sent ? (
              <div className="border border-line p-10 text-center">
                <p className="font-serif text-3xl italic text-sepia">
                  Dziękuję!
                </p>
                <p className="mt-4 text-ink-soft">
                  Twoja wiadomość poleciała do mojej skrzynki. Odezwę się
                  najpóźniej pojutrze — a zwykle szybciej.
                </p>
                <p className="caps mt-6 text-ink-soft">
                  (wersja demo — formularz nie wysyła wiadomości)
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-8 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="imie" className="caps text-ink-soft">
                    Imię i nazwisko
                  </label>
                  <input
                    id="imie"
                    name="imie"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Anna Nowak"
                    className="field mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="caps text-ink-soft">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="anna@przyklad.pl"
                    className="field mt-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="data" className="caps text-ink-soft">
                    Data wydarzenia <span className="normal-case">(jeśli znana)</span>
                  </label>
                  <input
                    id="data"
                    name="data"
                    type="date"
                    className="field mt-2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="wiadomosc" className="caps text-ink-soft">
                    Wiadomość
                  </label>
                  <textarea
                    id="wiadomosc"
                    name="wiadomosc"
                    required
                    rows={4}
                    placeholder="Opowiedz mi o swoich planach…"
                    className="field mt-2 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="caps cursor-pointer border border-ink px-8 py-4 transition-colors duration-300 hover:bg-ink hover:text-cream"
                  >
                    Wyślij zapytanie
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
