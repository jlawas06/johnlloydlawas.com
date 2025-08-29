import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { calculateReadingTime, generateExcerpt } from './utils';

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  published?: boolean;
  startDate?: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  images?: string[];
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
  published?: boolean;
  startDate?: string;
  endDate?: string;
  demoUrl?: string;
  githubUrl?: string;
  images?: string[];
  client?: string;
  role?: string;
  teamSize?: number;
  duration?: string;
  readingTime: number;
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');

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
        const { data, content } = matter(fileContents);

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
          published: data.published !== false,
          startDate: data.startDate,
          endDate: data.endDate,
          demoUrl: data.demoUrl,
          githubUrl: data.githubUrl,
          images: data.images || [],
          client: data.client,
          role: data.role,
          teamSize: data.teamSize,
          duration: data.duration,
          readingTime,
        } as ProjectMeta;
      })
      .filter(project => project.published)
      .sort((a, b) => {
        // Sort by start date (most recent first)
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

    const { data, content } = matter(fileContents);

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
      published: data.published !== false,
      startDate: data.startDate,
      endDate: data.endDate,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      images: data.images || [],
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
