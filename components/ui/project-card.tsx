import { type ProjectMeta } from '@/lib/projects';
import { cn, formatMonth } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Tag from './tag';

interface ProjectCardProps {
  project: ProjectMeta;
  className?: string;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group relative flex h-full flex-col rounded border border-border bg-card p-5 transition-colors hover:border-accent/50',
        className
      )}
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <div className="font-mono text-[11px] text-muted-foreground">
          <span className="text-accent">$</span> open{' '}
          <span className="text-foreground">./{project.slug}.md</span>
        </div>
        <ArrowUpRight
          size={14}
          className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <h3 className="mb-2 font-mono text-base font-medium text-foreground">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mb-3 flex flex-wrap gap-1">
        {project.technologies.slice(0, 5).map((tech) => (
          <Tag key={tech}>{tech.toLowerCase()}</Tag>
        ))}
        {project.technologies.length > 5 && (
          <Tag variant="outline">+{project.technologies.length - 5}</Tag>
        )}
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>{project.category.toLowerCase()}</span>
        {project.startDate && (
          <span>
            {formatMonth(project.startDate)}
            {project.endDate ? ` → ${formatMonth(project.endDate)}` : ''}
          </span>
        )}
      </div>
    </Link>
  );
}
