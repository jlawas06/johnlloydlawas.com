import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './mdx-components-server';

interface BlogPostMDXProps {
  content: string;
}

export default function BlogPostMDX({ content }: BlogPostMDXProps) {
  return (
    <article className="
      prose prose-lg max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:border-gray-200 prose-h2:dark:border-gray-700 prose-h2:pb-3
      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
      prose-p:mb-6 prose-p:leading-relaxed
      prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:bg-gray-100 prose-code:dark:bg-gray-800
      prose-pre:bg-transparent prose-pre:p-0
      prose-strong:font-semibold prose-strong:text-blue-600 prose-strong:dark:text-blue-400
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic
      prose-ul:mb-6 prose-ol:mb-6
      prose-li:mb-2
      prose-table:my-8
      prose-img:rounded-lg prose-img:shadow-lg
      prose-gray dark:prose-invert
    ">
      <MDXRemote source={content} components={mdxComponents} />
    </article>
  );
}
