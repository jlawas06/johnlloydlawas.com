import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { calculateReadingTime, generateExcerpt, stripLeadingH1 } from './utils';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  /** Lower numbers appear first. Undated projects without one fall back to start date. */
  order?: number;
  published?: boolean;
  startDate?: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  images?: string[];
  /** Card image. Only set when the file exists in /public, so a missing
      screenshot renders the empty plate instead of a broken image. */
  cover?: ProjectImage;
  client?: string;
  role?: string;
  teamSize?: number;
  duration?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  readingTime: number;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  /** Lower numbers appear first. Undated projects without one fall back to start date. */
  order?: number;
  published?: boolean;
  startDate?: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  images?: string[];
  /** Card image. Only set when the file exists in /public, so a missing
      screenshot renders the empty plate instead of a broken image. */
  cover?: ProjectImage;
  client?: string;
  role?: string;
  teamSize?: number;
  duration?: string;
  readingTime: number;
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');
const publicDirectory = path.join(process.cwd(), 'public');

/**
 * The card image: frontmatter `image` (`/work/<slug>.webp`), else the first
 * gallery screenshot. Checked against the filesystem at build time, never on
 * the client.
 */
function resolveCover(
  data: matter.GrayMatterFile<string>['data'],
  title: string
): ProjectImage | undefined {
  const candidates: ProjectImage[] = [];
  if (typeof data.image?.src === 'string') {
    candidates.push({ src: data.image.src, alt: data.image.alt || `${title} interface` });
  }
  if (typeof data.images?.[0] === 'string') {
    candidates.push({ src: data.images[0], alt: `${title} interface` });
  }
  return candidates.find((img) => fs.existsSync(path.join(publicDirectory, img.src)));
}

/**
 * Get all projects metadata
 */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames
      .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
      .map(fileName => {
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: raw } = matter(fileContents);
        const content = stripLeadingH1(raw);

        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const readingTime = calculateReadingTime(content);
        const description = data.description || generateExcerpt(content);

        return {
          slug,
          title: data.title || 'Untitled Project',
          description,
          technologies: data.technologies || [],
          category: data.category || 'Web Development',
          featured: data.featured || false,
          order: typeof data.order === 'number' ? data.order : undefined,
          published: data.published !== false,
          startDate: data.startDate,
          endDate: data.endDate,
          demoUrl: data.demoUrl,
          githubUrl: data.githubUrl,
          images: data.images || [],
          cover: resolveCover(data, data.title || 'Untitled Project'),
          client: data.client,
          role: data.role,
          teamSize: data.teamSize,
          duration: data.duration,
          readingTime,
        } as ProjectMeta;
      })
      .filter(project => project.published)
      .sort((a, b) => {
        const orderA = a.order ?? Number.POSITIVE_INFINITY;
        const orderB = b.order ?? Number.POSITIVE_INFINITY;
        if (orderA !== orderB) return orderA - orderB;
        const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
        const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

    return projects;
  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
    let fileContents: string;

    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch {
      // Try .md extension if .mdx doesn't exist
      const mdPath = path.join(projectsDirectory, `${slug}.md`);
      fileContents = fs.readFileSync(mdPath, 'utf8');
    }

    const { data, content: raw } = matter(fileContents);
    const content = stripLeadingH1(raw);

    const readingTime = calculateReadingTime(content);
    const description = data.description || generateExcerpt(content);

    return {
      slug,
      title: data.title || 'Untitled Project',
      description,
      content,
      technologies: data.technologies || [],
      category: data.category || 'Web Development',
      featured: data.featured || false,
      order: typeof data.order === 'number' ? data.order : undefined,
      published: data.published !== false,
      startDate: data.startDate,
      endDate: data.endDate,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      images: data.images || [],
      cover: resolveCover(data, data.title || 'Untitled Project'),
      client: data.client,
      role: data.role,
      teamSize: data.teamSize,
      duration: data.duration,
      challenges: data.challenges || [],
      solutions: data.solutions || [],
      results: data.results || [],
      readingTime,
    };
  } catch (error) {
    console.error(`Error getting project ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured).slice(0, 3);
}

/**
 * Get recent projects
 */
export async function getRecentProjects(limit: number = 6): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects();
  return allProjects.slice(0, limit);
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get projects by technology
 */
export async function getProjectsByTechnology(technology: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project =>
    project.technologies.some(tech =>
      tech.toLowerCase() === technology.toLowerCase()
    )
  );
}

/**
 * Get all unique categories from projects
 */
export async function getAllCategories(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const categorySet = new Set<string>();
  
  allProjects.forEach(project => {
    categorySet.add(project.category);
  });
  
  return Array.from(categorySet).sort();
}

/**
 * Get all unique technologies from projects
 */
export async function getAllTechnologies(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const techSet = new Set<string>();
  
  allProjects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  
  return Array.from(techSet).sort();
}
