'use client';

import ExperienceTimeline from '@/components/ui/experience-timeline';
import { useTheme } from './theme-provider';

export default function ExperienceContent() {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      <ExperienceTimeline />
    </div>
  );
}
