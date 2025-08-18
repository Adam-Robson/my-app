'use client';

import { useTheme } from '@/app/contexts/theme-provider';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import '@/app/components/theme/theme-toggle.css';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <div className="theme-toggle-container">
      <button
        className="theme-toggle"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        title="Toggle Theme"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
      <label className="theme-toggle-label text-sm text-center">
        {isDark ? 'light' : 'dark'}
      </label>
    </div>
  );
}
