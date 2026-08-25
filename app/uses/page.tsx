import BlogPostMDX from '@/components/ui/blog-post-mdx';
import { Container, Eyebrow } from '@/components/ui/primitives';
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
    <Container width="narrow">
      <div className="py-16 sm:py-20">
        <Eyebrow className="mb-4">Uses</Eyebrow>
        <h1 className="font-display text-title font-semibold text-ink">
          Hardware, editor, stack
        </h1>
        <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
          Last updated {page.updated ?? 'recently'}
        </p>
        <div className="mt-12 border-t border-rule pt-10">
          <BlogPostMDX content={page.content} />
        </div>
      </div>
    </Container>
  );
}
