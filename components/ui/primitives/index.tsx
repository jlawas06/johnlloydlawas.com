import { cn } from '@/lib/utils';
import Link from 'next/link';

/* ------------------------------------------------------------------
   Container — the page measure. One value, used everywhere.
   ------------------------------------------------------------------ */

export function Container({
  children,
  className,
  width = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'wide' | 'narrow';
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-10',
        width === 'wide' && 'max-w-[88rem]',
        width === 'default' && 'max-w-6xl',
        width === 'narrow' && 'max-w-3xl',
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Labels — sentence case in the body face, never tracked caps. Mono is
   reserved for data (email, dates, tags, figures), and a label is not data.
   ------------------------------------------------------------------ */

/** Small label: definition terms, captions, card metadata. */
export const labelClass = 'font-body text-[0.8125rem] leading-snug text-slate';

/** Eyebrow — the label above a heading. */
export function Eyebrow({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'span' | 'p';
}) {
  return (
    <Tag
      className={cn(
        'font-body text-[0.875rem] leading-snug text-slate',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Section — vertical rhythm plus an optional header.
   ------------------------------------------------------------------ */

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  actionClassName,
  children,
  className,
  width,
  bleed = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  actionClassName?: string;
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'wide' | 'narrow';
  bleed?: boolean;
}) {
  const header = (eyebrow || title || description || action) && (
    <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        {title && (
          <h2 className="font-display text-heading font-semibold text-ink">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-3 text-[0.975rem] leading-relaxed text-graphite">
            {description}
          </p>
        )}
      </div>
      {action && <div className={cn('shrink-0', actionClassName)}>{action}</div>}
    </div>
  );

  const body = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('py-12 sm:py-24', className)}>
      {bleed ? body : <Container width={width}>{body}</Container>}
    </section>
  );
}

/* ------------------------------------------------------------------
   Button — replaces ten copies of the same class string.
   ------------------------------------------------------------------ */

type ButtonVariant = 'primary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md';

const buttonBase =
  'group inline-flex items-center justify-center gap-2 font-display text-[0.8125rem] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50';

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'rounded-[3px] bg-ink text-paper hover:bg-graphite border border-ink hover:border-graphite',
  ghost:
    'rounded-[3px] border border-rule-strong bg-transparent text-ink hover:bg-surface hover:border-ink',
  link: 'text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink touch:min-h-11',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 touch:h-11',
  md: 'h-10 px-4 touch:h-11',
};

export function buttonClass(
  variant: ButtonVariant = 'ghost',
  size: ButtonSize = 'md',
  className?: string
) {
  return cn(
    buttonBase,
    buttonVariants[variant],
    variant !== 'link' && buttonSizes[size],
    className
  );
}

export function Button({
  href,
  external,
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...rest
}: {
  href?: string;
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = buttonClass(variant, size, className);

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------
   Card — replaces twelve hand-written bordered divs.
   ------------------------------------------------------------------ */

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
}) {
  return (
    <Tag
      className={cn(
        'border border-rule bg-surface',
        interactive && 'transition-colors hover:border-rule-strong',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Rail — the narrow metadata column. Values are body copy; set `mono`
   on an item whose value is data (a date range, a figure, tags).
   ------------------------------------------------------------------ */

export interface RailItem {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}

export function Rail({
  items,
  className,
}: {
  items: RailItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl className={cn('space-y-5', className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className={labelClass}>{item.label}</dt>
          <dd
            className={cn(
              'mt-1 leading-relaxed text-ink',
              item.mono ? 'font-mono text-[0.8125rem]' : 'font-body text-[0.9375rem]'
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------
   Chip — a stack token. Mono, because a technology name is data.
   ------------------------------------------------------------------ */

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      data-chip
      className={cn(
        'inline-flex items-center border border-rule bg-surface px-2 py-0.5 font-mono text-[0.8125rem] text-graphite',
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
   Prose — long-form wrapper.
   ------------------------------------------------------------------ */

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('prose', className)}>{children}</div>;
}
