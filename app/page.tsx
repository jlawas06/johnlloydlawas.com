import Hero from '@/components/ui/hero';
import PostCard from '@/components/ui/post-card';
import TimelineRow from '@/components/ui/experience-card';
import ProjectCard from '@/components/ui/project-card';
import { Button, Container, Eyebrow, Section } from '@/components/ui/primitives';
import { experiences } from '@/data/experience';
import { personalInfo } from '@/data/personal';
import { getRecentPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

/**
 * How I work — written for someone deciding whether to hire, not for a
 * peer reading a stack list. Adapted from the principles on /about.
 */
const principles = [
  {
    title: 'Boring technology, on purpose',
    body: 'I reach for the stack your team can still maintain in three years. Novelty is a cost, and it is usually paid by whoever inherits the codebase.',
  },
  {
    title: 'The number has to move',
    body: 'Every engagement starts by measuring what is actually slow or broken, and ends by measuring it again. If the figure did not move, the work is not finished.',
  },
  {
    title: 'Async by default',
    body: 'I work from UTC+8 with teams across Europe and North America. Written updates, small reviewable changes, and no dependency on a shared calendar hour.',
  },
];

export default async function Home() {
  const [projects, posts] = await Promise.all([getAllProjects(), getRecentPosts(3)]);
  const featured = projects.filter((p) => p.featured);
  const selected = (featured.length > 0 ? featured : projects).slice(0, 3);
  const recentRoles = experiences.slice(0, 4);

  return (
    <>
      <Hero />

      {selected.length > 0 && (
        <Section
          id="work"
          eyebrow="Selected work"
          title="Case studies"
          description="Enterprise platforms and shipped products — the problem, the constraints, and what changed."
          action={
            <Button href="/projects" variant="link">
              All case studies
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selected.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i === 0} />
            ))}
          </div>
        </Section>
      )}

      <Section
        eyebrow="How I work"
        title="Three things you can hold me to"
        className="border-y border-rule bg-surface"
      >
        <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="bg-surface p-7 sm:p-8">
              <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="experience"
        eyebrow="Track record"
        title="Where I've worked"
        action={
          <Button href="/experience" variant="link">
            Full timeline
            <ArrowUpRight size={13} strokeWidth={1.75} />
          </Button>
        }
      >
        <div className="border-t border-rule">
          {recentRoles.map((exp) => (
            <TimelineRow key={exp.id} experience={exp} compact />
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section
          id="writing"
          eyebrow="Writing"
          title="Notes from the work"
          description="What I learned building the things above — mostly the parts that were harder than expected."
          action={
            <Button href="/blog" variant="link">
              All writing
              <ArrowUpRight size={13} strokeWidth={1.75} />
            </Button>
          }
        >
          <div className="border-t border-rule">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <section className="border-t border-rule bg-surface">
        <Container>
          <div className="flex flex-col gap-8 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow className="mb-4">Next step</Eyebrow>
              <h2 className="font-display text-title font-semibold text-ink">
                Have a system that needs to get faster?
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-graphite">
                Tell me what is slow, what it is costing you, and when it needs
                to be fixed. I reply to every email within one working day.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary">
                Start a project
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
              <Link
                href={`mailto:${personalInfo.email}`}
                className="font-mono text-[0.75rem] text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                {personalInfo.email}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
