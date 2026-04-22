import ExperienceCard from '@/components/ui/experience-card';
import Section from '@/components/ui/section';
import { experiences } from '@/data/experience';
import { personalInfo } from '@/data/personal';
import { formatDuration, getTotalExperience } from '@/lib/utils';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience',
  description: `Professional experience of ${personalInfo.name}. ${getTotalExperience()}+ years of full-stack development — from enterprise ASP.NET/Angular platforms to AI-integrated Chrome extensions and SaaS products.`,
};

export default function ExperiencePage() {
  const totalYears = getTotalExperience();
  const earliest = experiences[experiences.length - 1];
  const currentOrLatest = experiences[0];

  return (
    <Section
      label="experience"
      title={`${totalYears}+ years of full-stack engineering`}
      description={`${experiences.length} roles across ${new Set(
        experiences.map((e) => e.company)
      ).size} companies — from aviation logistics and legacy ERP modernization to AI-integrated Chrome extensions and SaaS.`}
      action={
        <Link
          href="/resume/john-lloyd-lawas-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          résumé.pdf →
        </Link>
      }
    >
      <div className="mb-8 grid grid-cols-2 gap-4 rounded border border-border bg-card p-4 font-mono text-xs sm:grid-cols-4">
        <div>
          <div className="text-muted-foreground">started</div>
          <div className="mt-1 text-foreground">{earliest.startDate}</div>
        </div>
        <div>
          <div className="text-muted-foreground">latest role</div>
          <div className="mt-1 truncate text-foreground">{currentOrLatest.company}</div>
        </div>
        <div>
          <div className="text-muted-foreground">total</div>
          <div className="mt-1 text-foreground">
            {formatDuration(earliest.startDate)}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">companies</div>
          <div className="mt-1 text-foreground">
            {new Set(experiences.map((e) => e.company)).size}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </Section>
  );
}
