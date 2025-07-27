import Header from '@/app/header';
import Footer from '@/app/footer';
import Main from '@/app/main';

export default function Home() {
  return (
   <div className="root min-h-screen max-w-screen mx-auto w-full relative">
      <Header />
      <Main />
      <Footer />
   </div>
  );
}
