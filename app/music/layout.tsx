import type { Metadata } from "next";

import PageWrapper from '@/components/loader/page-wrapper';
import Music from "@/music/page";
import Providers from "@/components/providers/providers";

export const metadata: Metadata = {
  title: "Le Fog",
  description: "Music",
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
    <PageWrapper>
      <Music />
    </PageWrapper>
    </Providers>
  );
}
