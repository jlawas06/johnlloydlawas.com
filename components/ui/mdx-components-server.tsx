import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  if (!match) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <div className="code-block my-6 overflow-hidden rounded-md border border-[#27272a] bg-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-[#27272a] px-4 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#3f3f46]" />
          <span className="h-2 w-2 rounded-full bg-[#3f3f46]" />
          <span className="h-2 w-2 rounded-full bg-[#3f3f46]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">
          {language}
        </span>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="pre"
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'var(--font-mono), ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
          },
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded border border-border">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border bg-muted">{children}</thead>;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </th>
  );
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-border last:border-b-0">{children}</tr>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2 text-sm">{children}</td>;
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-accent bg-muted/40 px-4 py-2 text-muted-foreground">
      {children}
    </blockquote>
  );
}

function Alert({
  children,
  type = 'info',
}: {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
}) {
  const marker = {
    info: 'i',
    warning: '!',
    success: '✓',
    error: '×',
  }[type];

  return (
    <div className="my-6 rounded border border-border bg-muted p-4">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-widest text-accent">
        <span className="mr-2">[{marker}]</span>
        {type}
      </div>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  code: CodeBlock,
  table: Table,
  thead: TableHead,
  th: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  td: TableCell,
  blockquote: Blockquote,
  Alert,
};
