'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export interface Delta {
  /** What was measured, e.g. "Application load time". */
  label: string;
  /** Caption for the baseline track, e.g. "Legacy build". */
  beforeLabel: string;
  /** Caption for the improved track, e.g. "After modernisation". */
  afterLabel: string;
  /** The headline figure, e.g. "−50%". This is the only coloured text. */
  figure: string;
  /** Length of the "after" track relative to the baseline. 0.5 = halved. */
  ratio: number;
  /** Where the measurement came from. */
  source?: string;
}

/**
 * The delta rule — a two-track measurement instrument.
 *
 * The baseline is drawn in graphite, the measured result in `--measure`.
 * Both tracks are normalised against the longer of the two, so an increase
 * (coverage) and a reduction (latency) read on the same scale.
 */
export function DeltaRule({
  delta,
  className,
  index = 0,
}: {
  delta: Delta;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const span = Math.max(1, delta.ratio);
  const beforeWidth = (1 / span) * 100;
  const afterWidth = (delta.ratio / span) * 100;
  const stagger = index * 90;

  return (
    <div ref={ref} className={cn('group', className)}>
      <div className="flex items-end justify-between gap-4 border-b border-rule pb-3">
        <span className="max-w-[14ch] font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-graphite">
          {delta.label}
        </span>
        <span className="font-mono text-3xl font-medium leading-none text-measure tabular-nums sm:text-[2.125rem]">
          {delta.figure}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <Track
          caption={delta.beforeLabel}
          width={beforeWidth}
          tone="baseline"
          drawn={drawn}
          delay={stagger}
        />
        <Track
          caption={delta.afterLabel}
          width={afterWidth}
          tone="measured"
          drawn={drawn}
          delay={stagger + 140}
        />
      </div>

      {delta.source && (
        <p className="mt-4 max-w-[42ch] font-mono text-[0.625rem] leading-relaxed text-slate">
          {delta.source}
        </p>
      )}
    </div>
  );
}

function Track({
  caption,
  width,
  tone,
  drawn,
  delay,
}: {
  caption: string;
  width: number;
  tone: 'baseline' | 'measured';
  drawn: boolean;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          'w-[6.5rem] shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em]',
          tone === 'measured' ? 'text-ink' : 'text-slate'
        )}
      >
        {caption}
      </span>
      <div
        className={cn(
          'h-1.5 flex-1',
          tone === 'measured' ? 'bg-measure-soft' : 'bg-surface-sunk'
        )}
      >
        <div
          className={cn(
            'delta-track h-full',
            tone === 'measured'
              ? 'delta-track--measured'
              : 'delta-track--baseline'
          )}
          data-animate={drawn ? 'true' : 'false'}
          style={{ width: `${width}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

/** Scope facts, shown where no measurement exists. Never fabricate a delta. */
export function ScopeRule({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <div className={cn('grid gap-px border border-rule bg-rule sm:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item.label} className="bg-surface px-4 py-3.5">
          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
            {item.label}
          </div>
          <div className="mt-1 font-mono text-[0.8125rem] text-ink">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
