'use client';

import Header from '@/components/layout/header';
import Main from '@/components/layout/main';
import Footer from '@/components/layout/footer';
import Providers from '@/components/providers/providers';

export default function Home() {
  return (
    <div className={`
     root relative h-screen
     max-w-screen w-full mx-auto
     flex flex-col items-center
     justify-center
   `}>
      <Providers>
        <Header />
        <Main />
        <Footer />
      </Providers>
    </div>
  );
}
