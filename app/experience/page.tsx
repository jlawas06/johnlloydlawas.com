import ExperienceContent from '@/components/ui/experience-content';
import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: `Professional experience of ${personalInfo.name}. ${getTotalExperience()}+ years of full-stack development across enterprise applications and multiple industries. Open to international opportunities.`,
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
