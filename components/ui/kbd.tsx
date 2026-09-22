import { cn } from '@/lib/utils';

export default function Kbd({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={cn(
        'inline-flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-[2px] border border-rule bg-surface-sunk px-1 font-mono text-[0.625rem] leading-none text-graphite',
        className
      )}
    >
      {children}
    </kbd>
  );
}
