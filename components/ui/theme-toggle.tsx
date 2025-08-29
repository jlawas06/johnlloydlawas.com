'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors cursor-pointer ${colors.hover}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className={colors.accent.replace('text-', 'text-')} />
      ) : (
        <Sun size={20} className={colors.accent.replace('text-', 'text-')} />
      )}
    </button>
  );
}
