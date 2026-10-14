import type { Metadata } from "next";
import { serif, sans } from "./fonts";
import { site } from "@/data/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} · ${site.tagline}, ${site.city}`,
  description:
    "Reportaże ślubne, portrety i sesje rodzinne w Krakowie i całej Polsce. Naturalne, ciepłe kadry bez pozowania: fotografia, która dobrze się starzeje.",
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description:
      "Reportaże ślubne, portrety i sesje rodzinne w Krakowie. Naturalne kadry bez pozowania.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.name,
      jobTitle: "Fotografka ślubna i portretowa",
      url: site.url,
      sameAs: [site.instagramUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "PL",
      },
    },
    {
      "@type": "LocalBusiness",
      name: `${site.name} Fotografia`,
      url: site.url,
      email: site.email,
      image: `${site.url}/og.jpg`,
      foundingDate: site.est,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "PL",
      },
      priceRange: "650–7400 PLN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
