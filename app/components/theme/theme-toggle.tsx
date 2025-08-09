'use client';

import { useTheme } from '@/app/contexts/theme-provider';
import {MoonIcon, SunIcon} from '@phosphor-icons/react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(!isDark ? 'dark' : 'light')}
      className={`
        text-xs p-1 rounded
        flex flex-col justify-center 
        items-center max-w-12 max-h-12
        m-6 font-regular shadow-xl
      `}
    >
      {!isDark ? <MoonIcon  size={24} /> : <SunIcon  size={24} /> } 
      {isDark ? 'light' : 'dark'}
    </button>
  );
}
