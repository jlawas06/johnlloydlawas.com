import BlogContent from '@/components/ui/blog-content';
import { personalInfo } from '@/data/personal';
import { getAllPosts, getAllTags } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Writing by ${personalInfo.name} on ASP.NET Core, Angular, Cursor, Claude Code, and shipping production software with LLM tooling.`,
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return <BlogContent posts={posts} tags={tags} />;
}
