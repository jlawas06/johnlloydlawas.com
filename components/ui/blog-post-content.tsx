import { Button, Container, Eyebrow, Rail } from '@/components/ui/primitives';
import ReadingProgress from '@/components/ui/reading-progress';
import { formatDate } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  author: string;
  tags: string[];
  featured?: boolean;
}

interface BlogPostContentProps {
  post: BlogPost;
  children: React.ReactNode;
}

export default function BlogPostContent({ post, children }: BlogPostContentProps) {
  return (
    <>
      <ReadingProgress />

      <header className="border-b border-rule">
        <Container>
          <div className="py-14 sm:py-16">
            <Link
              href="/blog"
              className="group mb-10 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate transition-colors hover:text-ink"
            >
              <ArrowLeft
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              All writing
            </Link>

            <div className="grid gap-12 lg:grid-cols-[1fr_14rem] lg:gap-16">
              <div>
                <Eyebrow className="mb-4">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </Eyebrow>
                <h1 className="max-w-[22ch] font-display text-title font-semibold text-ink">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite">
                  {post.excerpt}
                </p>
              </div>

              <Rail
                className="lg:border-l lg:border-rule lg:pl-8"
                items={[
                  { label: 'Reading time', value: `${post.readingTime} min` },
                  { label: 'Written by', value: post.author },
                  ...(post.tags.length > 0
                    ? [{ label: 'Topics', value: post.tags.join(', ') }]
                    : []),
                ]}
              />
            </div>
          </div>
        </Container>
      </header>

      <Container width="narrow">
        <div className="py-14 sm:py-16">{children}</div>
      </Container>

      <div className="border-t border-rule bg-surface">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 py-12">
            <p className="max-w-[42ch] font-display text-lg font-semibold text-ink">
              Run into this in your own codebase?
            </p>
            <div className="flex gap-3">
              <Button href="/contact" variant="primary" size="sm">
                Get in touch
              </Button>
              <Button href="/blog" variant="ghost" size="sm">
                All writing
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
