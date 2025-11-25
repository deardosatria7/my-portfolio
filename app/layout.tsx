import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
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
    url: "https://deardosatria.com",
    siteName: "Deardo Satria Portfolio",
    locale: "id_ID",
    type: "website",
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
    canonical: "https://deardosatria.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <SplashCursor />
      </body>
    </html>
  );
}
