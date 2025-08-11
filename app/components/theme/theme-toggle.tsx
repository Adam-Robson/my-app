'use client';

import { useTheme } from '@/app/contexts/theme-provider';
import {MoonIcon, SunIcon} from '@phosphor-icons/react';
import '@/app/components/theme/theme-toggle.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <>
    <div 
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </div>
    </>
  );
}
