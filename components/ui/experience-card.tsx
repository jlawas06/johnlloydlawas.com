import { type Experience } from '@/data/experience';
import { cn, formatDuration, formatMonth } from '@/lib/utils';
import Tag from './tag';

interface ExperienceCardProps {
  experience: Experience;
  compact?: boolean;
  className?: string;
}

export default function ExperienceCard({
  experience,
  compact = false,
  className,
}: ExperienceCardProps) {
  const isCurrent = experience.endDate === null;
  const id = experience.company
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');

  return (
    <article
      className={cn(
        'group relative rounded border border-border bg-card p-5 transition-colors hover:border-border-strong',
        className
      )}
    >
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <div className="font-mono text-[11px] text-muted-foreground">
            <span className="text-accent">$</span>{' '}
            <span className="text-foreground">cd</span>{' '}
            <span>
              ~/work/<span className="text-foreground">{id}</span>
            </span>
          </div>
          <h3 className="mt-1 truncate font-mono text-base font-medium text-foreground">
            {experience.position}{' '}
            <span className="text-muted-foreground">@ {experience.company}</span>
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span>
            {formatMonth(experience.startDate)} → {formatMonth(experience.endDate)}
          </span>
          <span className="text-border-strong">·</span>
          <span>{formatDuration(experience.startDate, experience.endDate)}</span>
          {isCurrent && (
            <span className="inline-flex items-center gap-1 rounded-sm border border-accent/30 bg-accent-muted px-1.5 py-0.5 text-[10px] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              current
            </span>
          )}
        </div>
      </header>

      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        {experience.description}
      </p>

      {!compact && experience.responsibilities.length > 0 && (
        <ul className="mb-4 space-y-1.5 text-sm text-muted-foreground">
          {experience.responsibilities.slice(0, 3).map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-0.5 select-none text-accent">›</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1">
        {experience.technologies.map((tech) => (
          <Tag key={tech}>{tech.toLowerCase()}</Tag>
        ))}
      </div>
    </article>
  );
}
