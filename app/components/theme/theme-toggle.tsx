'use client';

import { useTheme } from '@/app/contexts/theme-provider';
import {PaintRollerIcon} from '@phosphor-icons/react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        text-xs p-1 rounded
        flex flex-col justify-center 
        items-center max-w-12 max-h-12
        m-6 font-semibold
      `}
    >
      <PaintRollerIcon size={24} /> 
      {theme}
    </button>
  );
}
