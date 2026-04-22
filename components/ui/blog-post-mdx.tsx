import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './mdx-components-server';

interface BlogPostMDXProps {
  content: string;
}

export default function BlogPostMDX({ content }: BlogPostMDXProps) {
  return (
    <article className="prose">
      <MDXRemote source={content} components={mdxComponents} />
    </article>
  );
}
