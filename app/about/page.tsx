import AboutContent from '@/components/ui/about-content';
import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${personalInfo.name}, a Full Stack Developer with ${getTotalExperience()}+ years of experience in enterprise application development. Available for remote work and international collaborations.`,
};

export default function AboutPage() {
  return <AboutContent />;
}
