"use client";

import type { ReactNode } from "react";

export const PACKAGE_EVENT = "lena:pakiet";

/** Link do formularza, który przy okazji zaznacza wybrany pakiet w polu "Pakiet". */
export default function PackageLink({ name, children }: { name: string; children: ReactNode }) {
  return (
    <a
      href="#kontakt"
      onClick={() => window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: name }))}
      className="caps inline-flex min-h-11 items-center text-sepia"
    >
      <span className="link-line">{children}</span>
    </a>
  );
}
