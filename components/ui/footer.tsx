import { personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Container, Eyebrow, labelClass } from './primitives';

const columns = [
  {
    label: 'Work',
    links: [
      { href: '/projects', label: 'Case studies' },
      { href: '/experience', label: 'Experience' },
      { href: '/skills', label: 'Stack' },
      { href: '/resume/john-lloyd-lawas-resume.pdf', label: 'Résumé (PDF)', external: true },
    ],
  },
  {
    label: 'More',
    links: [
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Writing' },
      { href: '/now', label: 'Now' },
      { href: '/uses', label: 'Uses' },
    ],
  },
  {
    label: 'Elsewhere',
    links: [
      { href: `mailto:${personalInfo.email}`, label: 'Email', external: true },
      { href: personalInfo.linkedin, label: 'LinkedIn', external: true },
      { href: personalInfo.github, label: 'GitHub', external: true },
      { href: '/feed.xml', label: 'RSS', external: true },
    ],
  },
];

/* On touch each link is a full 44px row; the list gap folds into the row. */
const linkClass =
  'font-display text-[0.8125rem] text-graphite transition-colors hover:text-ink touch:inline-flex touch:min-h-11 touch:min-w-11 touch:items-center';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <Container>
        {/* Phones fit the three link columns on one row. */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-10 py-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-3 sm:col-span-2 lg:col-span-1">
            <div className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
              {personalInfo.name}
            </div>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-graphite">
              Full-stack engineer. I modernise enterprise systems and ship
              AI-integrated products.
            </p>
            <p className={cn('mt-4', labelClass)}>Cebu City, Philippines · UTC+8</p>
          </div>

          {columns.map((col) => (
            <div key={col.label}>
              <Eyebrow className="mb-4">{col.label}</Eyebrow>
              <ul className="space-y-2.5 touch:space-y-0">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={linkClass}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={cn(
            'flex flex-col gap-3 border-t border-rule py-7 sm:flex-row sm:items-center sm:justify-between',
            labelClass
          )}
        >
          <span>© {year} {personalInfo.name}</span>
          <span>Built with Next.js. Deployed on Vercel.</span>
        </div>
      </Container>
    </footer>
  );
}
