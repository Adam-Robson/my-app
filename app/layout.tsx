
import type { Metadata } from "next";

import { Monda, Barlow } from "next/font/google";

import PageWrapper from '@/components/loader/page-wrapper';
import "./globals.css";

const monda = Monda({
  variable: '--monda',
  subsets: ['latin'],
});

const barlow = Barlow({
  variable: '--barlow',
  subsets: ['latin'],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Le Fog",
  description: "Website for le fog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${monda.variable} 
          ${barlow.variable} 
          antialiased
        `}
      >
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
