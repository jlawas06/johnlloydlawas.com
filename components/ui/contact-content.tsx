'use client';

import { personalInfo } from '@/data/personal';
import { Check, Copy, Download, ExternalLink, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Section from './section';

export default function ContactContent() {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);

  const copy = async (value: string, kind: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // fallback handled by anchor
    }
  };

  return (
    <Section
      label="contact"
      title="let's build something"
      description="Open to remote full-stack roles, consulting, and interesting enterprise projects. The fastest way to reach me is email."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded border border-border bg-card p-6">
          <div className="mb-4 font-mono text-[11px] text-muted-foreground">
            <span className="text-accent">$</span> cat contact.yml
          </div>

          <dl className="divide-y divide-border font-mono text-sm">
            <Row
              label="email"
              value={personalInfo.email}
              icon={<Mail size={14} />}
              action={
                <>
                  <button
                    type="button"
                    onClick={() => copy(personalInfo.email, 'email')}
                    className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    {copied === 'email' ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                    {copied === 'email' ? 'copied' : 'copy'}
                  </button>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink size={12} />
                    mail
                  </a>
                </>
              }
            />
            <Row
              label="phone"
              value={personalInfo.phone}
              icon={<Phone size={14} />}
              action={
                <>
                  <button
                    type="button"
                    onClick={() => copy(personalInfo.phone, 'phone')}
                    className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    {copied === 'phone' ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                    {copied === 'phone' ? 'copied' : 'copy'}
                  </button>
                </>
              }
            />
            <Row
              label="linkedin"
              value={personalInfo.linkedin.replace('https://www.', '')}
              icon={<Linkedin size={14} />}
              action={
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink size={12} />
                  open
                </a>
              }
            />
            <Row
              label="location"
              value="Cebu City, Philippines · UTC+8"
              icon={<MapPin size={14} />}
            />
            <Row
              label="résumé"
              value="john-lloyd-lawas-resume.pdf"
              icon={<Download size={14} />}
              action={
                <Link
                  href="/resume/john-lloyd-lawas-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <Download size={12} />
                  download
                </Link>
              }
            />
          </dl>
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-border bg-card p-4 font-mono text-xs">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-foreground">available</span>
            </div>
            <p className="text-muted-foreground">
              Open to remote roles, consulting, and freelance engagements — especially
              modernization / greenfield .NET + Angular work.
            </p>
          </div>

          <div className="rounded border border-border bg-card p-4 font-mono text-xs">
            <div className="mb-1 text-muted-foreground">response time</div>
            <div className="text-foreground">typically within 24 hours (UTC+8)</div>
          </div>

          <div className="rounded border border-border bg-card p-4 font-mono text-xs">
            <div className="mb-2 text-muted-foreground">best for</div>
            <ul className="space-y-1 text-foreground">
              <li>› enterprise web apps</li>
              <li>› legacy .net modernization</li>
              <li>› angular frontends</li>
              <li>› api + integration work</li>
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Row({
  label,
  value,
  icon,
  action,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      <div className="flex w-24 items-center gap-2 text-muted-foreground">
        {icon && <span className="text-subtle">{icon}</span>}
        <span>{label}:</span>
      </div>
      <div className="min-w-0 flex-1 truncate text-foreground">{value}</div>
      {action && <div className="flex shrink-0 items-center gap-1">{action}</div>}
    </div>
  );
}
