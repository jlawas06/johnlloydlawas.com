import BlogPostMDX from '@/components/ui/blog-post-mdx';
import Section from '@/components/ui/section';
import { getMdxPage } from '@/lib/mdx-page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SOURCE = 'uses.mdx';

export async function generateMetadata(): Promise<Metadata> {
  const page = getMdxPage(SOURCE);
  return {
    title: page?.title ?? 'Uses',
    description: page?.description,
  };
}

export default function UsesPage() {
  const page = getMdxPage(SOURCE);
  if (!page) notFound();

  return (
    <Section
      label="uses"
      title="hardware, editor, stack"
      description={`Last updated: ${page.updated ?? 'recently'}.`}
    >
      <BlogPostMDX content={page.content} />
    </Section>
  );
}
