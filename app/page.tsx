import Header from '@/app/header';
import Footer from '@/app/footer';
import Providers from '@/app/components/providers/providers';
import ThemeToggle from '@/app/components/theme/theme-toggle';

export default function Home() {
  return (
   <div className={`
     root w-full max-w-screen mx-auto
     flex flex-col items-center justify-center
     relative min-h-screen z-0
   `}>
      <Providers>
        <Header />
        <ThemeToggle />
        <Footer />
      </Providers>
   </div>
  );
}
