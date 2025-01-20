import type { Metadata } from "next";
import Buttoncard from "@/_components/buttoncard";
import "./globals.css";
import "./colors.css";
import { dosis } from "./_fonts/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dosis.variable} antialiased`}
      >
        {children}

        <Buttoncard />

      </body>

    </html>
  );
}
