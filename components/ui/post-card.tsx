import { type BlogPostMeta } from '@/lib/posts';
import { cn, formatDateShort } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Tag from './tag';

interface PostCardProps {
  post: BlogPostMeta;
  className?: string;
}

export default function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex items-start gap-4 border-b border-border py-4 transition-colors hover:border-border-strong',
        className
      )}
    >
      <div className="w-24 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground sm:w-28">
        {formatDateShort(post.date).toLowerCase()}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-mono text-sm font-medium text-foreground transition-colors group-hover:text-accent sm:text-base">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
          <span>{post.readingTime} min read</span>
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag} variant="outline">
              {tag.toLowerCase()}
            </Tag>
          ))}
        </div>
      </div>
      <ArrowUpRight
        size={14}
        className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </Link>
  );
}
