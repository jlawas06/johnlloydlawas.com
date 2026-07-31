import AboutContent from '@/components/ui/about-content';
import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${personalInfo.name} — Full Stack Developer, ${getTotalExperience()}+ yrs across enterprise .NET/Angular and AI products. Remote from Cebu City, PH (UTC+8).`,
};

export default function AboutPage() {
  return <AboutContent />;
}
