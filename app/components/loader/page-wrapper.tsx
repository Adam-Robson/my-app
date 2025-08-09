'use client';

import { useEffect, useState } from 'react';
import Loader from '@/app/components/loader/loader';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');

    if (hasSeenLoader) {
      setLoading(false);
    } else {
      sessionStorage.setItem('hasSeenLoader', 'true');

      const fadeTimeout = setTimeout(() => setFadeOut(true), 1000);
      const doneTimeout = setTimeout(() => setLoading(false), 1300);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(doneTimeout);
      };
    }
  }, []);

  return (
    <>
      {loading && <Loader fadeOut={fadeOut} />}
      {!loading && children}
    </>
  );
}
