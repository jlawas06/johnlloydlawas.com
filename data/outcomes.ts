import type { Outcome } from '@/components/ui/primitives/outcome';

/**
 * Measured outcomes, keyed by project slug.
 *
 * This is the single source of truth for every measured figure, so the home
 * page, cards and case studies can never disagree.
 *
 * Only add an entry when the number was actually measured. Projects without
 * one render scope facts instead — see `ScopeRule`.
 *
 * TODO(john): before/after bars were removed because these entries hold a
 * percentage, not two measurements. To bring a bar back for an entry, add the
 * real values as `{ before: number; after: number; unit: string }` (e.g. load
 * time in seconds) and print both numbers next to the bar. Never derive them
 * from the percentage.
 */
export const outcomes: Record<string, Outcome> = {
  'osl-international': {
    label: 'Application load time',
    figure: '−50%',
    ratio: 0.5,
    source: 'Measured across 5+ modernised ASP.NET applications, 2019–2022.',
  },
  'nowcom-global-services': {
    label: 'Legacy app performance',
    figure: '+40%',
    ratio: 0.6,
    source: 'Response times on the revamped .NET and Angular platform, 2022–2025.',
  },
  'yondu-inc': {
    label: 'Test coverage',
    figure: '+60%',
    ratio: 1.6,
    source: 'Unit test coverage across the delivery codebase, 2022.',
  },
};

/** The three figures that lead the home page, in the order they read best. */
export const headlineOutcomes: Outcome[] = [
  outcomes['osl-international'],
  outcomes['nowcom-global-services'],
  outcomes['yondu-inc'],
];

export function getOutcome(slug: string): Outcome | undefined {
  return outcomes[slug];
}
