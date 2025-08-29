import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { calculateReadingTime, generateExcerpt } from './utils';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
  readingTime: number;
  featured?: boolean;
  published?: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: number;
  featured?: boolean;
  published?: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all blog posts metadata
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
      .map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const slug = fileName.replace(/\.(mdx|md)$/, '');
        const readingTime = calculateReadingTime(content);
        const excerpt = data.excerpt || generateExcerpt(content);

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt,
          tags: data.tags || [],
          author: data.author || 'John Lloyd Lawas',
          readingTime,
          featured: data.featured || false,
          published: data.published !== false, // default to true
        } as BlogPostMeta;
      })
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let fileContents: string;

    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch {
      // Try .md extension if .mdx doesn't exist
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      fileContents = fs.readFileSync(mdPath, 'utf8');
    }

    const { data, content } = matter(fileContents);

    const readingTime = calculateReadingTime(content);
    const excerpt = data.excerpt || generateExcerpt(content);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt,
      content,
      tags: data.tags || [],
      author: data.author || 'John Lloyd Lawas',
      readingTime,
      featured: data.featured || false,
      published: data.published !== false,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, 3);
}

/**
 * Get recent blog posts
 */
export async function getRecentPosts(limit: number = 5): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get all unique tags from posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Search posts by title or content
 */
export async function searchPosts(query: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
