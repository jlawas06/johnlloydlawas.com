import BlogPostMDX from '@/components/ui/blog-post-mdx';
import { Container, Eyebrow, labelClass } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';
import { getMdxPage } from '@/lib/mdx-page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const SOURCE = 'now.mdx';

export async function generateMetadata(): Promise<Metadata> {
  const page = getMdxPage(SOURCE);
  return {
    title: page?.title ?? 'Now',
    description: page?.description,
  };
}

export default function NowPage() {
  const page = getMdxPage(SOURCE);
  if (!page) notFound();

  return (
    <Container width="narrow">
      <div className="py-16 sm:py-20">
        <Eyebrow className="mb-4">Now</Eyebrow>
        <h1 className="font-display text-title font-semibold text-ink">
          What I&apos;m focused on
        </h1>
        <p className={cn('mt-4', labelClass)}>
          Last updated {page.updated ?? 'recently'}
        </p>
        <div className="mt-12 border-t border-rule pt-10">
          <BlogPostMDX content={page.content} />
        </div>
      </div>
    </Container>
  );
}
