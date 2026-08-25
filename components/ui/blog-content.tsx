import PostCard from '@/components/ui/post-card';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { type BlogPostMeta } from '@/lib/posts';

interface BlogContentProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogContent({ posts, tags }: BlogContentProps) {
  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="max-w-3xl py-16 sm:py-20">
            <Eyebrow className="mb-4">Writing</Eyebrow>
            <h1 className="font-display text-title font-semibold text-ink">
              Notes from the work
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-graphite">
              Two threads, mostly. Modernising enterprise .NET and Angular
              systems, and getting real work out of Cursor, Claude Code and the
              LLM APIs without the hype.
            </p>
            {tags.length > 0 && (
              <p className="mt-8 max-w-[60ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.12em] text-slate">
                {tags.slice(0, 12).join(' · ')}
              </p>
            )}
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-12 sm:py-14">
          {posts.length === 0 ? (
            <div className="border border-dashed border-rule-strong px-8 py-16 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                Nothing published yet.
              </p>
              <p className="mt-2 text-[0.9375rem] text-graphite">
                First post is in progress.
              </p>
            </div>
          ) : (
            <div className="border-t border-rule">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
