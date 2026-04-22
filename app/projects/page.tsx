import ProjectCard from '@/components/ui/project-card';
import Section from '@/components/ui/section';
import Tag from '@/components/ui/tag';
import { personalInfo } from '@/data/personal';
import { getAllProjects } from '@/lib/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Portfolio of enterprise applications and software projects by ${personalInfo.name}. ASP.NET Core, Angular, and full-stack case studies.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const categories = Array.from(new Set(projects.map((p) => p.category))).sort();

  return (
    <Section
      label="projects"
      title="case studies"
      description="Enterprise work — problem, constraints, approach, and measured impact."
    >
      {projects.length === 0 ? (
        <div className="rounded border border-dashed border-border bg-card p-10 text-center">
          <div className="mb-2 font-mono text-xs text-muted-foreground">
            <span className="text-accent">$</span> ls ./projects
          </div>
          <p className="font-mono text-sm text-foreground">
            no case studies published yet.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check back soon — I&apos;m documenting recent work.
          </p>
        </div>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <Tag key={c} variant="outline">
                  {c.toLowerCase()}
                </Tag>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
