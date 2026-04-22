import ReadingProgress from '@/components/ui/reading-progress';
import Tag from '@/components/ui/tag';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
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

      <header className="border-b border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="group mb-6 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            cd ../blog
          </Link>

          <div className="mb-3 font-mono text-[11px] text-muted-foreground">
            <span className="text-accent">$</span> cat ./{post.slug}.md
          </div>

          <h1 className="mb-4 font-mono text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          <p className="mb-5 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime} min read
            </span>
            <span>by {post.author.toLowerCase()}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag.toLowerCase()}</Tag>
            ))}
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
              all posts
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              questions? get in touch →
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
