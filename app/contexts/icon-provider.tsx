'use client';

import { IconContext } from '@phosphor-icons/react';

export default function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider
      value={{
        size: 22, // default size in px
        weight: "regular", // "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
        color: "currentColor", // inherits text color
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
