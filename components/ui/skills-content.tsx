'use client';

import SkillsShowcase from '@/components/ui/skills-showcase';
import { useTheme } from './theme-provider';

export default function SkillsContent() {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${colors.background}`}>
      <SkillsShowcase />
    </div>
  );
}
