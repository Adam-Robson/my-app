'use client';

import { IconContext } from '@phosphor-icons/react';

export default function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider
      value={{
        color: 'currentColor',
        size: 24,
        weight: 'regular',
        mirrored: false,
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
