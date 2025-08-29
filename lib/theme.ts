export const themeColors = {
  dark: {
    background: 'bg-gray-900',
    card: 'bg-gray-800/90',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    accent: 'text-cyan-400',
    accentHover: 'hover:text-cyan-300',
    button: 'bg-cyan-500 hover:bg-cyan-400',
    buttonText: 'text-gray-900',
    border: 'border-gray-700',
    navBg: 'bg-gray-900/80',
    cardHover: 'hover:bg-gray-700/50',
    formInput: 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500 focus:border-cyan-500',
  },
  light: {
    background: 'bg-gray-50',
    card: 'bg-white/90',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    accent: 'text-cyan-600',
    accentHover: 'hover:text-cyan-500',
    button: 'bg-cyan-600 hover:bg-cyan-500',
    buttonText: 'text-white',
    border: 'border-gray-200',
    navBg: 'bg-white/80',
    cardHover: 'hover:bg-gray-50',
    formInput: 'bg-white border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500',
  },
} as const;

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  button: string;
  buttonText: string;
  border: string;
  navBg: string;
  cardHover: string;
  formInput: string;
}
