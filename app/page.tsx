import Link from 'next/link';
import Background from './_components/background';

export default function Home() {
  return (
    <div className="homepage can">
      <Background />
      <Link href="/collections" className="navlink txt">collections</Link>
      <Link href="/about" className="navlink txt">about</Link>
      <Link href="/contact" className="navlink txt">contact</Link>
    </div>
  );
}
