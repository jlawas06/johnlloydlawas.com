import { personalInfo } from '@/data/personal';
import Link from 'next/link';
import { Container, Eyebrow } from './primitives';

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <div className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink">
              {personalInfo.name}
            </div>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-graphite">
              Full-stack engineer. I modernise enterprise systems and ship
              AI-integrated products.
            </p>
            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
              Cebu City, Philippines · UTC+8
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.label}>
              <Eyebrow className="mb-4">{col.label}</Eyebrow>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-[0.8125rem] text-graphite transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-display text-[0.8125rem] text-graphite transition-colors hover:text-ink"
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

        <div className="flex flex-col gap-3 border-t border-rule py-7 font-mono text-[0.6875rem] text-slate sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {personalInfo.name}</span>
          <span>Built with Next.js. Deployed on Vercel.</span>
        </div>
      </Container>
    </footer>
  );
}
