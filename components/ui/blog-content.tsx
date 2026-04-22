import PostCard from '@/components/ui/post-card';
import Section from '@/components/ui/section';
import Tag from '@/components/ui/tag';
import { type BlogPostMeta } from '@/lib/posts';

interface BlogContentProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogContent({ posts, tags }: BlogContentProps) {
  return (
    <Section
      label="blog"
      title="notes on enterprise engineering"
      description="Deep dives on ASP.NET Core, Angular, and the unglamorous details of modernizing legacy systems."
    >
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          {tags.slice(0, 10).map((tag) => (
            <Tag key={tag} variant="outline">
              {tag.toLowerCase()}
            </Tag>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded border border-dashed border-border bg-card p-10 text-center">
          <div className="mb-2 font-mono text-xs text-muted-foreground">
            <span className="text-accent">$</span> ls ./posts
          </div>
          <p className="font-mono text-sm text-foreground">no posts yet.</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Section>
  );
}
