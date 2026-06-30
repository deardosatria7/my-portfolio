import { Playfair_Display, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-ds",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body-ds",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://zenio.id"),
  title: "Deardo Satria – Full-Stack Developer Portfolio",
  description:
    "Website portfolio Deardo Satria. Menampilkan proyek, pengalaman kerja, serta keahlian dalam pengembangan web, UI/UX, dan teknologi modern.",
  keywords: [
    "Deardo Satria",
    "portfolio",
    "web developer",
    "full stack developer",
    "UI UX designer",
    "software engineer",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Deardo Satria" }],
  creator: "Deardo Satria",
  publisher: "Deardo Satria",

  openGraph: {
    title: "Deardo Satria – Full-Stack Developer Portfolio",
    description:
      "Lihat proyek dan pengalaman Deardo Satria sebagai fullstack web developer.",
    url: "https://zenio.id",
    siteName: "Deardo Satria Portfolio",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Deardo Satria – Full-Stack Developer Portfolio",
    description:
      "Lihat proyek dan pengalaman Deardo Satria sebagai fullstack web developer.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://zenio.id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://zenio.id/#person",
      name: "Deardo Satria",
      url: "https://zenio.id",
      jobTitle: "Full-Stack Developer",
      sameAs: [
        "https://www.linkedin.com/in/deardo-satria-5a8b69278",
        "https://github.com/deardosatria7",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://zenio.id/#website",
      url: "https://zenio.id",
      name: "Deardo Satria Portfolio",
      inLanguage: "id-ID",
      publisher: { "@id": "https://zenio.id/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
