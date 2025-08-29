'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-cyan-500 dark:text-cyan-500" />
      ) : (
        <Sun size={20} className="text-cyan-500 dark:text-cyan-500" />
      )}
    </button>
  );
}
