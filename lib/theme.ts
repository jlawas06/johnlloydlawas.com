export const themeColors = {
  dark: {
    // Backgrounds
    background: 'bg-gray-900',
    backgroundSecondary: 'bg-gray-800',
    backgroundTertiary: 'bg-gray-700',
    card: 'bg-gray-800/90',
    cardSolid: 'bg-gray-800',
    surface: 'bg-gray-800/50',
    
    // Text colors
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    textInverse: 'text-gray-900',
    
    // Accent colors
    accent: 'text-cyan-400',
    accentHover: 'hover:text-cyan-300',
    accentBg: 'bg-cyan-500',
    accentBgHover: 'hover:bg-cyan-400',
    
    // Buttons
    button: 'bg-cyan-500 hover:bg-cyan-400',
    buttonSecondary: 'bg-gray-700 hover:bg-gray-600',
    buttonOutline: 'border border-gray-600 hover:bg-gray-700',
    buttonText: 'text-gray-900',
    buttonTextSecondary: 'text-gray-100',
    
    // Interactive states
    hover: 'hover:bg-gray-700/50',
    cardHover: 'hover:bg-gray-700/50',
    linkHover: 'hover:text-cyan-300',
    
    // Borders and dividers
    border: 'border-gray-700',
    borderSecondary: 'border-gray-600',
    divider: 'border-gray-700',
    
    // Navigation
    navBg: 'bg-gray-900/80',
    navBorder: 'border-gray-700',
    
    // Forms
    formInput: 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-cyan-500 focus:border-cyan-500',
    formLabel: 'text-gray-300',
    formPlaceholder: 'placeholder-gray-400',
    
    // Status colors
    success: 'text-green-400',
    successBg: 'bg-green-900/20',
    warning: 'text-yellow-400',
    warningBg: 'bg-yellow-900/20',
    error: 'text-red-400',
    errorBg: 'bg-red-900/20',
    info: 'text-blue-400',
    infoBg: 'bg-blue-900/20',
    
    // Gradients
    gradientPrimary: 'from-cyan-500 to-cyan-600',
    gradientSecondary: 'from-gray-800 to-gray-900',
    gradientAccent: 'from-cyan-400 to-cyan-600',
  },
  light: {
    // Backgrounds
    background: 'bg-gray-50',
    backgroundSecondary: 'bg-white',
    backgroundTertiary: 'bg-gray-100',
    card: 'bg-white/90',
    cardSolid: 'bg-white',
    surface: 'bg-white/50',
    
    // Text colors
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    textInverse: 'text-white',
    
    // Accent colors
    accent: 'text-cyan-600',
    accentHover: 'hover:text-cyan-500',
    accentBg: 'bg-cyan-600',
    accentBgHover: 'hover:bg-cyan-500',
    
    // Buttons
    button: 'bg-cyan-600 hover:bg-cyan-500',
    buttonSecondary: 'bg-gray-200 hover:bg-gray-300',
    buttonOutline: 'border border-gray-300 hover:bg-gray-50',
    buttonText: 'text-white',
    buttonTextSecondary: 'text-gray-900',
    
    // Interactive states
    hover: 'hover:bg-gray-50',
    cardHover: 'hover:bg-gray-50',
    linkHover: 'hover:text-cyan-500',
    
    // Borders and dividers
    border: 'border-gray-200',
    borderSecondary: 'border-gray-300',
    divider: 'border-gray-200',
    
    // Navigation
    navBg: 'bg-white/80',
    navBorder: 'border-gray-200',
    
    // Forms
    formInput: 'bg-white border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500',
    formLabel: 'text-gray-700',
    formPlaceholder: 'placeholder-gray-400',
    
    // Status colors
    success: 'text-green-600',
    successBg: 'bg-green-50',
    warning: 'text-yellow-600',
    warningBg: 'bg-yellow-50',
    error: 'text-red-600',
    errorBg: 'bg-red-50',
    info: 'text-blue-600',
    infoBg: 'bg-blue-50',
    
    // Gradients
    gradientPrimary: 'from-cyan-600 to-cyan-700',
    gradientSecondary: 'from-gray-50 to-white',
    gradientAccent: 'from-cyan-500 to-cyan-600',
  },
} as const;

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Backgrounds
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  card: string;
  cardSolid: string;
  surface: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  
  // Accent colors
  accent: string;
  accentHover: string;
  accentBg: string;
  accentBgHover: string;
  
  // Buttons
  button: string;
  buttonSecondary: string;
  buttonOutline: string;
  buttonText: string;
  buttonTextSecondary: string;
  
  // Interactive states
  hover: string;
  cardHover: string;
  linkHover: string;
  
  // Borders and dividers
  border: string;
  borderSecondary: string;
  divider: string;
  
  // Navigation
  navBg: string;
  navBorder: string;
  
  // Forms
  formInput: string;
  formLabel: string;
  formPlaceholder: string;
  
  // Status colors
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  error: string;
  errorBg: string;
  info: string;
  infoBg: string;
  
  // Gradients
  gradientPrimary: string;
  gradientSecondary: string;
  gradientAccent: string;
}
