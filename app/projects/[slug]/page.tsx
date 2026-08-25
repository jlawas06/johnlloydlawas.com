import BlogPostMDX from '@/components/ui/blog-post-mdx';
import { Button, Chip, Container, Eyebrow, Rail } from '@/components/ui/primitives';
import { DeltaRule, ScopeRule } from '@/components/ui/primitives/delta-rule';
import ReadingProgress from '@/components/ui/reading-progress';
import { getOutcome } from '@/data/outcomes';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';
import { cn, formatRange } from '@/lib/utils';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
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
  if (!project) return { title: 'Case study not found' };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const outcome = getOutcome(project.slug);

  const railItems = [
    project.client && { label: 'Client', value: project.client },
    project.role && { label: 'Role', value: project.role },
    project.teamSize && { label: 'Team', value: `${project.teamSize} people` },
    project.duration && { label: 'Duration', value: project.duration },
    project.startDate && {
      label: 'Timeline',
      value: formatRange(project.startDate, project.endDate),
    },
    { label: 'Category', value: project.category },
  ].filter(Boolean) as { label: string; value: string }[];

  /* No measured delta for this project — show scope facts rather than
     inventing a figure. */
  const scopeItems = [
    project.role && { label: 'Role', value: project.role },
    project.duration && { label: 'Duration', value: project.duration },
    {
      label: 'Stack',
      value: project.technologies.slice(0, 3).join(', '),
    },
  ].filter(Boolean) as { label: string; value: string }[];

  /* Only the populated sections become cells — an absent `challenges` array
     must not leave a blank column in the grid. */
  const summaryCells = [
    project.challenges?.length && {
      label: 'Problem',
      items: project.challenges,
      measured: false,
    },
    project.solutions?.length && {
      label: 'Approach',
      items: project.solutions,
      measured: false,
    },
    project.results?.length && {
      label: 'Outcome',
      items: project.results,
      measured: true,
    },
  ].filter(Boolean) as { label: string; items: string[]; measured: boolean }[];

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    keywords: project.technologies.join(', '),
    ...(project.startDate ? { dateCreated: project.startDate } : {}),
    author: { '@type': 'Person', name: 'John Lloyd Lawas', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <ReadingProgress />

      <header className="border-b border-rule">
        <Container>
          <div className="py-14 sm:py-16">
            <Link
              href="/projects"
              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All case studies
            </Link>

            <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
              <div>
                <Eyebrow className="mb-4">{project.category}</Eyebrow>
                <h1 className="max-w-[20ch] font-display text-title font-semibold text-ink">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite">
                  {project.description}
                </p>

                {(project.demoUrl || project.githubUrl) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.demoUrl && (
                      <Button href={project.demoUrl} external variant="primary" size="sm">
                        <ExternalLink size={13} strokeWidth={1.75} />
                        View it live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button href={project.githubUrl} external variant="ghost" size="sm">
                        <Github size={13} strokeWidth={1.75} />
                        Source
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <Rail items={railItems} className="lg:border-l lg:border-rule lg:pl-8" />
            </div>
          </div>
        </Container>
      </header>

      {/* The measured result, or the scope of the engagement. Never both,
          and never a fabricated figure. */}
      <section className="border-b border-rule bg-surface">
        <Container>
          <div className="py-10 sm:py-12">
            {outcome ? (
              <div className="max-w-xl">
                <DeltaRule delta={outcome} />
              </div>
            ) : (
              <>
                <Eyebrow className="mb-5">Scope</Eyebrow>
                <ScopeRule items={scopeItems} />
              </>
            )}
          </div>
        </Container>
      </section>

      {project.images && project.images.length > 0 && (
        <section className="border-b border-rule">
          <Container>
            <div className="space-y-4 py-12 sm:space-y-6 sm:py-14">
              {project.images.map((src, i) => (
                <figure key={src} className="border border-rule bg-surface-sunk">
                  <Image
                    src={src}
                    alt={`${project.title} — screen ${i + 1}`}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 72rem, 100vw"
                    priority={i === 0}
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          </Container>
        </section>
      )}

      {summaryCells.length > 0 && (
        /* A scannable precis. The narrative below carries the detail, so these
           use mono labels rather than headings that would collide with the
           MDX body's own sections. */
        <section className="border-b border-rule">
          <Container>
            <div className="py-12 sm:py-14">
              <Eyebrow className="mb-5">At a glance</Eyebrow>
              <div
                className={cn(
                  'grid grid-cols-1 gap-px border border-rule bg-rule',
                  summaryCells.length === 3 && 'md:grid-cols-3',
                  summaryCells.length === 2 && 'md:grid-cols-2'
                )}
              >
                {summaryCells.map((cell) => (
                  <SummaryCell key={cell.label} {...cell} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      <Container>
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <div className="min-w-0">
            <BlogPostMDX content={project.content} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow className="mb-4">Stack</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </aside>
        </div>
      </Container>

      <section className="border-t border-rule bg-surface">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 py-12">
            <p className="font-display text-lg font-semibold text-ink">
              Working on something similar?
            </p>
            <div className="flex gap-3">
              <Button href="/contact" variant="primary" size="sm">
                Get in touch
              </Button>
              <Button href="/projects" variant="ghost" size="sm">
                More case studies
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SummaryCell({
  label,
  items,
  measured = false,
}: {
  label: string;
  items: string[];
  measured?: boolean;
}) {
  return (
    <div className="bg-surface p-6">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
        {label}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[0.875rem_1fr] gap-2 text-[0.9375rem] leading-relaxed text-ink"
          >
            <span
              aria-hidden="true"
              className={
                measured
                  ? 'mt-[0.62em] h-px w-2 bg-measure'
                  : 'mt-[0.62em] h-px w-2 bg-rule-strong'
              }
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
