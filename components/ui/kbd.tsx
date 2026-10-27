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
        'inline-flex h-5 min-w-5 items-center justify-center rounded-[2px] border border-rule bg-surface-sunk px-1 font-mono text-[0.75rem] leading-none text-graphite',
        className
      )}
    >
      {children}
    </kbd>
  );
}
