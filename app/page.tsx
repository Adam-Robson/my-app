import Link from 'next/link';
import Background from './_components/background';

export default function Home() {
  return (
    <div className="homepage">
      <Background />
      <Link href="/collections" className="navlink">collections</Link>
    </div>
  );
}
