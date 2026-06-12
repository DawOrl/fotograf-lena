import { Fraunces, Jost } from "next/font/google";

export const serif = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const sans = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
