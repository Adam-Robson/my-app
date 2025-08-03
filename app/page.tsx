'use client';

import Header from '@/app/header';
import Main from '@/app/main';
import Footer from '@/app/footer';
import Providers from '@/app/components/providers/providers';

export default function Home() {
  return (
   <div className={`
     root w-full max-w-screen mx-auto
     flex flex-col items-center justify-center
     relative min-h-screen z-0
   `}>
      <Providers>
        <Header />
        <Main />
        <Footer />
      </Providers>
   </div>
  );
}
