'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setThemeState(current);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore write errors (private mode etc.)
    }
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// Inline script that runs before hydration to avoid a flash of wrong theme.
// Default is dark; respects saved preference first, then prefers-color-scheme.
export const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'dark');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;
