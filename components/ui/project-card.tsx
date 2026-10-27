import { getOutcome } from '@/data/outcomes';
import { type ProjectMeta } from '@/lib/projects';
import { cn, formatRange } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Chip, labelClass } from './primitives';

interface ProjectCardProps {
  project: ProjectMeta;
  className?: string;
  /** The first card on a page carries the LCP image. */
  priority?: boolean;
}

export default function ProjectCard({
  project,
  className,
  priority = false,
}: ProjectCardProps) {
  const outcome = getOutcome(project.slug);
  const cover = project.cover;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex h-full flex-col border border-rule bg-surface transition-colors hover:border-rule-strong',
        className
      )}
    >
      {cover ? (
        <div
          data-card-media
          className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-surface-sunk"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        /* No screenshot yet: a plain plate that holds the 16:10 slot. The
           title below names the project, so the plate carries no text. */
        <div
          data-card-media
          aria-hidden="true"
          className="aspect-[16/10] border-b border-rule bg-surface-sunk"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className={cn('flex items-baseline justify-between gap-3', labelClass)}>
          <span>{project.category}</span>
          <span className="shrink-0 font-mono text-[0.75rem]">
            {formatRange(project.startDate, project.endDate)}
          </span>
        </div>

        <h3 className="mt-3 font-display text-[1.0625rem] font-semibold leading-snug text-ink">
          {project.title}
        </h3>

        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-graphite">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
          {project.technologies.length > 4 && (
            <Chip className="border-dashed">+{project.technologies.length - 4}</Chip>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-rule pt-4">
          {outcome ? (
            <span className="font-mono text-[0.8125rem] text-measure tabular-nums">
              {outcome.figure}{' '}
              <span className="text-slate">{outcome.label.toLowerCase()}</span>
            </span>
          ) : (
            <span className={labelClass}>Read case study</span>
          )}
          <ArrowUpRight
            size={15}
            strokeWidth={1.75}
            className="shrink-0 text-slate transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
          />
        </div>
      </div>
    </Link>
  );
}
