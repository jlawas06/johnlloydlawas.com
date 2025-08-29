import SkillsContent from '@/components/ui/skills-content';
import { personalInfo } from '@/data/personal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: `Technical skills and expertise of ${personalInfo.name}. Comprehensive overview of full-stack development capabilities including ASP.NET Core, Angular, and enterprise technologies. Ready for global remote projects.`,
};

export default function SkillsPage() {
  return <SkillsContent />;
}
