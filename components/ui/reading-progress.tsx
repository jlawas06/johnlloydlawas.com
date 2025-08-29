'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-700">
      <div
        className={`h-full transition-all duration-150 ease-out ${colors.accent.includes('blue') ? 'bg-blue-500' : 'bg-purple-500'}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
