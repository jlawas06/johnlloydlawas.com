import type { Delta } from '@/components/ui/primitives/delta-rule';

/**
 * Measured outcomes, keyed by project slug.
 *
 * This is the single source of truth for every figure the delta rule draws,
 * so the home page and a case study can never disagree. Each entry traces
 * back to a `results` line in the corresponding MDX frontmatter.
 *
 * Only add an entry when the number was actually measured. Projects without
 * one render scope facts instead — see `ScopeRule`.
 */
export const outcomes: Record<string, Delta> = {
  'osl-international': {
    label: 'Application load time',
    beforeLabel: 'Legacy build',
    afterLabel: 'After rework',
    figure: '−50%',
    ratio: 0.5,
    source: 'Measured across 5+ modernised ASP.NET applications, 2019–2022.',
  },
  'nowcom-global-services': {
    label: 'Legacy app performance',
    beforeLabel: 'Inherited',
    afterLabel: 'After rework',
    figure: '+40%',
    ratio: 0.6,
    source: 'Response times on the revamped .NET and Angular platform, 2022–2025.',
  },
  'yondu-inc': {
    label: 'Test coverage',
    beforeLabel: 'At handover',
    afterLabel: 'At delivery',
    figure: '+60%',
    ratio: 1.6,
    source: 'Unit test coverage across the delivery codebase, 2022.',
  },
};

/** The three figures that lead the home page, in the order they read best. */
export const headlineOutcomes: Delta[] = [
  outcomes['osl-international'],
  outcomes['nowcom-global-services'],
  outcomes['yondu-inc'],
];

export function getOutcome(slug: string): Delta | undefined {
  return outcomes[slug];
}
