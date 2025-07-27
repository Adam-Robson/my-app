import type { Metadata } from "next";
import { Monda } from "next/font/google";
import "./globals.css";

const monda = Monda({
  variable: "--monda",
  subsets: ["latin"],
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
        className={`${monda.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
