import Link from 'next/link';
import Background from './_components/background';

export default function Home() {
  return (
    <div className="homepage can">
      <Background />
      <div className="navlinks grid grid-cols-1 grid-rows-3">
        <Link href="/collections" className="navlink txt">collections</Link>
        <Link href="/about" className="navlink txt">about</Link>
        <Link href="/contact" className="navlink txt">contact</Link>
      </div>
    </div>
  );
}
