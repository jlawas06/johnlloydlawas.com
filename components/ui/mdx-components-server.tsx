import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/* Code is machine output, so it stays dark in both themes — a deliberate
   inversion against the paper ground rather than a terminal costume. */
const CODE_BG = '#12171D';
const CODE_RULE = '#252C34';

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
    <div
      className="code-block my-7 overflow-hidden"
      style={{ background: CODE_BG, border: `1px solid ${CODE_RULE}` }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: `1px solid ${CODE_RULE}` }}
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-[#6B7681]">
          {language}
        </span>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="pre"
        customStyle={{
          margin: 0,
          padding: '1.1rem 1.25rem',
          background: 'transparent',
          fontSize: '0.8125rem',
          lineHeight: '1.65',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'var(--font-jetbrains), ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
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
    <div className="my-7 overflow-x-auto border border-rule">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-rule bg-surface-sunk">{children}</thead>;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 text-left font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
      {children}
    </th>
  );
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-rule last:border-b-0">{children}</tr>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2.5 font-mono text-[0.8125rem]">{children}</td>;
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-7 border-l-2 border-rule-strong pl-5 italic text-graphite">
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
  const label = {
    info: 'Note',
    warning: 'Caution',
    success: 'Worth knowing',
    error: 'Gotcha',
  }[type];

  return (
    <aside className="my-7 border-l-2 border-ink bg-surface-sunk px-5 py-4">
      <p className="mb-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
        {label}
      </p>
      <div className="text-[1rem] leading-relaxed text-ink [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
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
