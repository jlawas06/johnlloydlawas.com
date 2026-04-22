import { personalInfo } from '@/data/personal';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const columns = [
  {
    label: 'site',
    links: [
      { href: '/', label: 'home' },
      { href: '/about', label: 'about' },
      { href: '/experience', label: 'experience' },
      { href: '/skills', label: 'skills' },
    ],
  },
  {
    label: 'work',
    links: [
      { href: '/projects', label: 'projects' },
      { href: '/blog', label: 'blog' },
      { href: '/uses', label: 'uses' },
      { href: '/now', label: 'now' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 font-mono text-sm text-foreground">
              <span className="text-accent">~/</span>johnlloyd
            </div>
            <p className="max-w-xs text-xs text-muted-foreground">
              Full-stack developer. ASP.NET Core + Angular. Based in Cebu City, working
              remotely with teams worldwide.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.label}>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="text-accent">{'//'}</span> {col.label}
              </div>
              <ul className="space-y-1.5 font-mono text-xs">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-subtle">./</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="text-accent">{'//'}</span> elsewhere
            </div>
            <ul className="space-y-1.5 font-mono text-xs">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail size={12} />
                  email
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin size={12} />
                  linkedin
                </a>
              </li>
              {personalInfo.github && (
                <li>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github size={12} />
                    github
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {year} {personalInfo.name.toLowerCase()}.
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            built with next.js · deployed on vercel
          </span>
        </div>
      </div>
    </footer>
  );
}
