import ProjectCard from '@/components/ui/project-card';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { personalInfo } from '@/data/personal';
import { getAllProjects } from '@/lib/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: `Case studies by ${personalInfo.name} — enterprise platform modernisation on ASP.NET Core and Angular, and AI-integrated products in React and Next.js.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="max-w-3xl py-16 sm:py-20">
            <Eyebrow className="mb-4">Work</Eyebrow>
            <h1 className="font-display text-title font-semibold text-ink">
              Case studies
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-graphite">
              Enterprise platforms and shipped products. Each one covers the
              problem, the constraints I worked under, what I actually changed,
              and — where it was measured — by how much.
            </p>
            {categories.length > 1 && (
              <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
                {projects.length} case studies · {categories.join(' · ')}
              </p>
            )}
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-14 sm:py-16">
          {projects.length === 0 ? (
            <div className="border border-dashed border-rule-strong px-8 py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                No case studies published yet.
              </p>
              <p className="mt-2 text-[0.9375rem] text-graphite">
                Recent work is still being written up. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  priority={i < 3}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
