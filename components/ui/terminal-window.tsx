import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  showDots?: boolean;
}

export default function TerminalWindow({
  title = 'bash',
  children,
  className,
  bodyClassName,
  showDots = true,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-border bg-card',
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2">
        {showDots && (
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </div>
        )}
        <span className="text-xs text-muted-foreground tracking-tight">
          {title}
        </span>
      </div>
      <div className={cn('p-5 sm:p-6', bodyClassName)}>{children}</div>
    </div>
  );
}
