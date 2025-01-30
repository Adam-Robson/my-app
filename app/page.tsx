import Link from 'next/link';
import Background from './_components/background';

export default function Home() {
  return (
    <div className="homepage can">
      <Background />
      <Link href="/collections" className="navlink txt">collections</Link>
    </div>
  );
}
