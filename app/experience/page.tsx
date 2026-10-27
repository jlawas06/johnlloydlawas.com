import TimelineRow from '@/components/ui/experience-card';
import { Button, Container, Eyebrow, labelClass } from '@/components/ui/primitives';
import { experiences } from '@/data/experience';
import { cn, formatDuration, formatMonth, getTotalExperience } from '@/lib/utils';
import { Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description: `${getTotalExperience()} years of full-stack engineering — enterprise ASP.NET Core and Angular platforms through to AI-integrated Chrome extensions and SaaS.`,
};

export default function ExperiencePage() {
  const totalYears = getTotalExperience();
  const earliest = experiences[experiences.length - 1];
  const companies = new Set(experiences.map((e) => e.company)).size;

  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow className="mb-4">Experience</Eyebrow>
              <h1 className="font-display text-title font-semibold text-ink">
                {totalYears} years of full-stack engineering
              </h1>
              <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-graphite">
                {experiences.length} roles across {companies} companies — aviation
                logistics, ERP modernisation, manufacturing platforms, and now
                AI-integrated products.
              </p>
            </div>
            <Button
              href="/resume/john-lloyd-lawas-resume.pdf"
              external
              variant="ghost"
              className="shrink-0"
            >
              <Download size={14} strokeWidth={1.75} />
              Résumé (PDF)
            </Button>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-12 sm:py-14">
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4">
            {[
              { label: 'First role', value: formatMonth(earliest.startDate), mono: true },
              { label: 'Total', value: formatDuration(earliest.startDate), mono: true },
              { label: 'Companies', value: String(companies), mono: true },
              { label: 'Current', value: experiences[0].company, mono: false },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface px-4 py-4">
                <dt className={labelClass}>{stat.label}</dt>
                <dd
                  className={cn(
                    'mt-1 text-ink',
                    stat.mono ? 'font-mono text-[0.8125rem]' : 'font-body text-[0.9375rem]'
                  )}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 border-t border-rule">
            {experiences.map((exp) => (
              <TimelineRow key={exp.id} experience={exp} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
