import { getOutcome } from '@/data/outcomes';
import { type ProjectMeta } from '@/lib/projects';
import { cn, formatRange } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Chip } from './primitives';

interface ProjectCardProps {
  project: ProjectMeta & { images?: string[] };
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
  const image = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex h-full flex-col border border-rule bg-surface transition-colors hover:border-rule-strong',
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule bg-surface-sunk">
        {image ? (
          <Image
            src={image}
            alt={`${project.title} interface`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          /* No screenshot yet — a quiet typographic plate, never a placeholder icon. */
          <div className="flex h-full items-end p-5">
            <span className="font-display text-[2.75rem] font-semibold leading-none tracking-tight text-rule-strong">
              {project.title.split(/[\s—]+/)[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
          <span>{project.category}</span>
          <span className="shrink-0 normal-case tracking-normal">
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
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
              Read case study
            </span>
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
