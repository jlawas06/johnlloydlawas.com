import { type BlogPostMeta } from '@/lib/posts';
import { cn, formatDateShort } from '@/lib/utils';
import Link from 'next/link';

interface PostCardProps {
  post: BlogPostMeta;
  className?: string;
}

export default function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group grid grid-cols-1 gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[9rem_1fr]',
        className
      )}
    >
      <div className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1.5">
        <time dateTime={post.date}>{formatDateShort(post.date)}</time>
        <span className="mx-2 text-rule-strong sm:hidden">·</span>
        <span className="sm:mt-1 sm:block">{post.readingTime} min read</span>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink decoration-rule-strong underline-offset-4 group-hover:underline sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-graphite">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 font-mono text-[0.6875rem] text-slate">
            {post.tags.slice(0, 3).join(' · ')}
          </div>
        )}
      </div>
    </Link>
  );
}
