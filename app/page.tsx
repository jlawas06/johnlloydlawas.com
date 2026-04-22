import ExperienceCard from '@/components/ui/experience-card';
import Hero from '@/components/ui/hero';
import PostCard from '@/components/ui/post-card';
import ProjectCard from '@/components/ui/project-card';
import Section from '@/components/ui/section';
import { experiences } from '@/data/experience';
import { getRecentPosts } from '@/lib/posts';
import { getAllProjects } from '@/lib/projects';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const [projects, posts] = await Promise.all([getAllProjects(), getRecentPosts(3)]);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayedProjects = (featuredProjects.length > 0 ? featuredProjects : projects).slice(0, 3);
  const recentExperience = experiences.slice(0, 3);

  return (
    <>
      <Hero />

      {displayedProjects.length > 0 && (
        <Section
          id="work"
          label="featured work"
          title="selected case studies"
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              all projects
              <ArrowUpRight size={12} />
            </Link>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      )}

      <Section
        id="experience"
        label="experience"
        title="recent roles"
        action={
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            full timeline
            <ArrowUpRight size={12} />
          </Link>
        }
      >
        <div className="space-y-3">
          {recentExperience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} compact />
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section
          id="writing"
          label="writing"
          title="recent notes"
          action={
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              all posts
              <ArrowUpRight size={12} />
            </Link>
          }
        >
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
