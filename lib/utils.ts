import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format full date (Month D, YYYY).
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format short date (MMM YYYY).
 */
export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

/**
 * Format ISO month (`YYYY-MM`) to lowercase `mmm yyyy`.
 */
export function formatMonth(iso: string | null | undefined): string {
  if (!iso) return 'present';
  const [y, m] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(y, (m ?? 1) - 1, 1));
  return d
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    })
    .toLowerCase();
}

/**
 * Returns `[years, months]` of duration between two ISO months.
 * `end` defaults to the current month when null/undefined.
 */
export function monthsBetween(start: string, end?: string | null): [number, number] {
  const [sy, sm] = start.split('-').map(Number);
  const endRef = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
  const [ey, em] = endRef;
  const total = (ey - sy) * 12 + (em - sm) + 1;
  const clamped = Math.max(total, 0);
  return [Math.floor(clamped / 12), clamped % 12];
}

/**
 * Format duration between two ISO months as e.g. `2y 3m` / `11m` / `1y`.
 */
export function formatDuration(start: string, end?: string | null): string {
  const [years, months] = monthsBetween(start, end);
  if (years === 0) return `${months}m`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}m`;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  const stripped = content.replace(/[#*`]/g, '').trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength).replace(/\s+\w*$/, '') + '…';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

/**
 * Total professional experience in years, based on the earliest start.
 */
export function getTotalExperience(): number {
  const startDate = new Date('2018-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
}
