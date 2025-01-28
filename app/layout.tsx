import type { Metadata } from "next";
import Buttoncard from "@/_components/buttoncard";
import "./globals.css";
import "./colors.css";
import { firaSansLight } from "./_fonts/fonts";

export const metadata: Metadata = {
  title: "Website for Le Fog",
  description: "Generated with create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSansLight.className} antialiased`}
      >
        {children}
        <Buttoncard />
      </body>
    </html>
  );
}
