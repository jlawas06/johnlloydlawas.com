import ProjectsContent from '@/components/ui/projects-content';
import { personalInfo } from '@/data/personal';
import { getAllProjects } from '@/lib/projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Portfolio of enterprise applications and software projects by ${personalInfo.name}. Showcasing ASP.NET Core, Angular, and full-stack development expertise for international clients.`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return <ProjectsContent projects={projects} />;
}
