import BlogPostMDX from '@/components/ui/blog-post-mdx';
import ReadingProgress from '@/components/ui/reading-progress';
import Tag from '@/components/ui/tag';
import TerminalWindow from '@/components/ui/terminal-window';
import { formatMonth } from '@/lib/utils';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const meta: Array<{ label: string; value: string }> = [
    project.client && { label: 'client', value: project.client },
    project.role && { label: 'role', value: project.role },
    project.teamSize && { label: 'team', value: `${project.teamSize} people` },
    project.duration && { label: 'duration', value: project.duration },
    project.startDate && {
      label: 'timeline',
      value: `${formatMonth(project.startDate)}${
        project.endDate ? ` → ${formatMonth(project.endDate)}` : ''
      }`,
    },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <>
      <ReadingProgress />

      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="group mb-6 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            cd ../projects
          </Link>

          <div className="mb-4 font-mono text-[11px] text-muted-foreground">
            <span className="text-accent">$</span> cat ./{project.slug}.md
          </div>

          <h1 className="mb-3 font-mono text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {project.title}
          </h1>

          <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {project.technologies.map((t) => (
              <Tag key={t}>{t.toLowerCase()}</Tag>
            ))}
          </div>

          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground hover:border-border-strong"
                >
                  <ExternalLink size={12} />
                  live demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground hover:border-border-strong"
                >
                  <Github size={12} />
                  source
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {meta.length > 0 && (
          <TerminalWindow title="project.yml" className="mb-10" bodyClassName="p-0">
            <dl className="divide-y divide-border">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="grid grid-cols-[120px_1fr] gap-4 px-5 py-2 font-mono text-sm"
                >
                  <dt className="text-muted-foreground">{m.label}:</dt>
                  <dd className="text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>
          </TerminalWindow>
        )}

        {(project.challenges?.length || project.solutions?.length || project.results?.length) && (
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.challenges && project.challenges.length > 0 && (
              <ProjectPanel title="problem" items={project.challenges} />
            )}
            {project.solutions && project.solutions.length > 0 && (
              <ProjectPanel title="approach" items={project.solutions} />
            )}
            {project.results && project.results.length > 0 && (
              <ProjectPanel title="impact" items={project.results} />
            )}
          </div>
        )}

        <BlogPostMDX content={project.content} />

        <div className="mt-16 border-t border-border pt-8 font-mono text-xs">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            more case studies
          </Link>
        </div>
      </div>
    </>
  );
}

function ProjectPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded border border-border bg-card p-4">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className="text-accent">{'//'}</span> {title}
      </div>
      <ul className="space-y-1.5 text-sm text-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="select-none text-accent">›</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
