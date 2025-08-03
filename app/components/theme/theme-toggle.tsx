'use client';

import { useTheme } from '@/app/contexts/theme-provider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-sm px-3 py-1 border rounded"
    >
      Toggle Theme ({theme})
    </button>
  );
}
