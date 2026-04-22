import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  label: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({
  id,
  label,
  title,
  description,
  action,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20', className)}>
      <div
        className={cn(
          'mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8',
          containerClassName
        )}
      >
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-accent">{'//'}</span> {label}
            </div>
            {title && (
              <h2 className="font-mono text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
