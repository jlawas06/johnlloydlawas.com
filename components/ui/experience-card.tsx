import { type Experience } from '@/data/experience';
import { getOutcome } from '@/data/outcomes';
import { cn, formatDuration, formatMonth } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Chip } from './primitives';

/**
 * Maps a role to its case study. The full account of the work lives in the
 * case study; this timeline carries only the employment record, so the two
 * pages never repeat each other.
 */
const CASE_STUDY_BY_COMPANY: Record<string, string> = {
  'Nowcom Global Services': 'nowcom-global-services',
  'Yondu Inc.': 'yondu-inc',
  'OSL International Inc.': 'osl-international',
  'Sense Software Solutions': 'sense-software-solutions',
  'Lear Corporation': 'lear-corporation',
};

interface TimelineRowProps {
  experience: Experience;
  /** Compact rows drop the summary line — used on the home page. */
  compact?: boolean;
  className?: string;
}

export default function TimelineRow({
  experience,
  compact = false,
  className,
}: TimelineRowProps) {
  const isCurrent = experience.endDate === null;
  const slug = CASE_STUDY_BY_COMPANY[experience.company];
  const outcome = slug ? getOutcome(slug) : undefined;

  const body = (
    <>
      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
        <div>
          {formatMonth(experience.startDate)} – {formatMonth(experience.endDate)}
        </div>
        <div className="mt-1 flex items-center gap-1.5 normal-case tracking-normal">
          <span>{formatDuration(experience.startDate, experience.endDate)}</span>
          {isCurrent && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 text-measure">
                <span className="h-1.5 w-1.5 rounded-full bg-measure" />
                Current
              </span>
            </>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
            {experience.position}
          </h3>
          <span className="font-display text-[0.9375rem] text-graphite">
            {experience.company}
          </span>
          {slug && (
            <ArrowUpRight
              size={14}
              strokeWidth={1.75}
              className="shrink-0 text-slate transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
            />
          )}
        </div>

        {!compact && (
          <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-graphite">
            {experience.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {experience.technologies.slice(0, compact ? 5 : 8).map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>

        {outcome && (
          <p className="mt-3 font-mono text-[0.8125rem] text-measure tabular-nums">
            {outcome.figure}{' '}
            <span className="text-slate">{outcome.label.toLowerCase()}</span>
          </p>
        )}
      </div>
    </>
  );

  const layout =
    'grid grid-cols-1 gap-x-8 gap-y-3 border-b border-rule py-7 last:border-b-0 sm:grid-cols-[9rem_1fr]';

  if (slug) {
    return (
      <Link href={`/projects/${slug}`} className={cn('group', layout, className)}>
        {body}
      </Link>
    );
  }

  return <article className={cn(layout, className)}>{body}</article>;
}
