'use client';

import Header from '@/app/components/layout/header';
import Main from '@/app/components/layout/main';
import Footer from '@/app/components/layout/footer';
import Providers from '@/app/components/providers/providers';

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
