'use client';

import Header from '@/app/header';
import Main from '@/app/main';
import Footer from '@/app/footer';
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
