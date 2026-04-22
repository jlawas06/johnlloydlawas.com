import { cn } from '@/lib/utils';

interface PromptProps {
  children: React.ReactNode;
  symbol?: string;
  caret?: boolean;
  className?: string;
}

export default function Prompt({
  children,
  symbol = '$',
  caret = false,
  className,
}: PromptProps) {
  return (
    <span className={cn('inline-flex items-baseline gap-2 font-mono', className)}>
      <span className="select-none text-accent">{symbol}</span>
      <span>{children}</span>
      {caret && <span className="caret" aria-hidden="true" />}
    </span>
  );
}
