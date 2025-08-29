import BlogContent from '@/components/ui/blog-content';
import { personalInfo } from '@/data/personal';
import { getAllPosts, getAllTags } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Technical articles and insights by ${personalInfo.name}. Read about ASP.NET Core, Angular, enterprise development, and software engineering best practices for global development teams.`,
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return <BlogContent posts={posts} tags={tags} />;
}
