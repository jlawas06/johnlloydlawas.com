import { cn } from '@/lib/utils';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export default function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground',
        className
      )}
    >
      {children}
    </kbd>
  );
}
