// components/Loader.tsx
import { useEffect, useState } from 'react';
import { SpinnerBallIcon } from '@phosphor-icons/react';

export default function Loader({ fadeOut = false }: { fadeOut?: boolean }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background text-primary
        transition-opacity duration-300 ease-in-out
        ${fadeIn && !fadeOut ? 'opacity-100' : 'opacity-0'} 
        ${fadeOut ? 'pointer-events-none' : ''}`}
    >
      <SpinnerBallIcon className="animate-spin h-10 w-10" />
    </div>
  );
}
