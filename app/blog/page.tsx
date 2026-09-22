import BlogContent from '@/components/ui/blog-content';
import { personalInfo } from '@/data/personal';
import { getAllPosts, getAllTags } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: `Writing by ${personalInfo.name} on modernising enterprise .NET and Angular systems, and on shipping production software with Cursor, Claude Code and the LLM APIs.`,
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return <BlogContent posts={posts} tags={tags} />;
}
