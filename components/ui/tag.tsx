import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
  as?: 'span' | 'a';
  href?: string;
}

export default function Tag({
  children,
  className,
  variant = 'default',
  as = 'span',
  href,
}: TagProps) {
  const base =
    'inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[11px] leading-none tracking-tight transition-colors';

  const variants = {
    default:
      'border border-border bg-muted text-muted-foreground hover:text-foreground',
    accent:
      'border border-accent/30 bg-accent-muted text-accent',
    outline:
      'border border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
  } as const;

  const classes = cn(base, variants[variant], className);

  if (as === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <span className={classes}>{children}</span>;
}
