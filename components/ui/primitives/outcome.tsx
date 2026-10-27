import { cn } from '@/lib/utils';
import { labelClass } from '.';

export interface Outcome {
  /** What was measured, e.g. "Application load time". */
  label: string;
  /** The headline figure, e.g. "−50%". This is the only coloured text. */
  figure: string;
  /** "After" relative to "before" (0.5 = halved). Only the OG image draws it. */
  ratio: number;
  /** Where the measurement came from. */
  source?: string;
}

/**
 * A measured outcome: the figure, what it measures, and where it came from.
 *
 * There are no before/after bars. The data holds a percentage, not two
 * measurements, so bars would imply precision the numbers do not have.
 * On phones the figure sits beside its label to keep the band short.
 */
export function OutcomeFigure({
  outcome,
  className,
}: {
  outcome: Outcome;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-[7rem_1fr] items-baseline gap-x-4 border-t border-rule pt-4 sm:block sm:pt-5',
        className
      )}
    >
      <p className="font-display text-[2.5rem] font-semibold leading-none text-measure tabular-nums sm:text-[3.25rem]">
        {outcome.figure}
      </p>
      <div>
        <p className="font-body text-[0.9375rem] font-medium leading-snug text-ink sm:mt-4">
          {outcome.label}
        </p>
        {outcome.source && (
          <p className="mt-1 max-w-[42ch] font-body text-[0.875rem] leading-relaxed text-slate">
            {outcome.source}
          </p>
        )}
      </div>
    </div>
  );
}

/** Scope facts, shown where no measurement exists. Never fabricate a figure. */
export function ScopeRule({
  items,
  className,
}: {
  items: { label: string; value: string; mono?: boolean }[];
  className?: string;
}) {
  return (
    <div className={cn('grid gap-px border border-rule bg-rule sm:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item.label} className="bg-surface px-4 py-3.5">
          <div className={labelClass}>{item.label}</div>
          <div
            className={cn(
              'mt-1 text-ink',
              item.mono ? 'font-mono text-[0.8125rem]' : 'font-body text-[0.9375rem]'
            )}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
