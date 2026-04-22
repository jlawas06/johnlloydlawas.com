import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface MdxPage {
  title: string;
  description?: string;
  updated?: string;
  content: string;
  data: Record<string, unknown>;
}

export function getMdxPage(relativePath: string): MdxPage | null {
  try {
    const fullPath = path.join(process.cwd(), 'content', relativePath);
    if (!fs.existsSync(fullPath)) return null;

    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    return {
      title: (data.title as string) ?? '',
      description: data.description as string | undefined,
      updated: data.updated as string | undefined,
      content,
      data,
    };
  } catch (err) {
    console.error(`Error reading MDX page ${relativePath}:`, err);
    return null;
  }
}
