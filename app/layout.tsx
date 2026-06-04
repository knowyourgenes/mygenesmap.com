import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "mygenesmap.com · the decode-yourself explorer",
    template: "%s · mygenesmap.com",
  },
  description:
    "An interactive map from what you feel to the gene that explains it. Tap the afternoon crash, the coffee that ruins your sleep, the diet that never works, and see the science behind each one, in plain language, with one thing to try. India-aware, free for everyone.",
  keywords: [
    "why do I crash at 3pm",
    "coffee ruins my sleep",
    "slow caffeine metaboliser",
    "lactose intolerance India",
    "symptom to gene explorer",
    "genetics in plain language",
  ],
  metadataBase: new URL("https://mygenesmap.com"),
  openGraph: {
    title: "mygenesmap.com · the decode-yourself explorer",
    description:
      "Tap what your body does. Find the gene behind it. Plain language, India-aware, free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
