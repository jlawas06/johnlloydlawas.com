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
   Eyebrow — mono, uppercase. A label, nothing more.
   Mono is permitted here because an eyebrow is metadata.
   ------------------------------------------------------------------ */

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
        'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate',
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
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'wide' | 'narrow';
  bleed?: boolean;
}) {
  const header = (eyebrow || title || description || action) && (
    <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
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
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );

  const body = (
    <>
      {header}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('py-16 sm:py-24', className)}>
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
  link: 'text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
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
   Rail — the narrow metadata column. Mono lives here.
   ------------------------------------------------------------------ */

export function Rail({
  items,
  className,
}: {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl className={cn('space-y-5', className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
            {item.label}
          </dt>
          <dd className="mt-1.5 font-mono text-[0.8125rem] leading-relaxed text-ink">
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
      className={cn(
        'inline-flex items-center border border-rule bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-graphite',
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
