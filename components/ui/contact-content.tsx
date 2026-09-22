'use client';

import { personalInfo } from '@/data/personal';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button, Container, Eyebrow } from './primitives';

/** Written for someone deciding whether to send the email, not for a peer. */
const goodFits = [
  'A platform that has slowed to a crawl and needs profiling, not a rewrite.',
  'A .NET or Angular codebase nobody wants to touch any more.',
  'An AI feature you want in a real product, with real error handling.',
  'A Chrome extension, from manifest through to Web Store review.',
];

const notFits = [
  'Pure design work, or a marketing site with no application behind it.',
  'Native iOS or Android — I would only slow you down.',
  'Anything needing on-site presence outside the Philippines.',
];

export default function ContactContent() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="max-w-3xl py-16 sm:py-20">
            <Eyebrow className="mb-4">Contact</Eyebrow>
            <h1 className="font-display text-title font-semibold text-ink">
              Tell me what is slow.
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-graphite">
              Email is the fastest way to reach me. Include what is broken or
              slow, roughly what it is costing you, and when it needs to be
              fixed. That is enough for me to tell you whether I can help.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${personalInfo.email}`} external variant="primary">
                Email me
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex h-10 items-center gap-2 border border-rule-strong px-3.5 font-mono text-[0.75rem] text-ink transition-colors hover:border-ink"
              >
                {copied ? (
                  <Check size={13} strokeWidth={2} className="text-ink" />
                ) : (
                  <Copy size={13} strokeWidth={1.75} />
                )}
                {copied ? 'Copied to clipboard' : personalInfo.email}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-14 sm:py-16">
          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
            <div className="bg-surface p-6">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
                Response time
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                Within one working day, every time. If I cannot take the work I
                will say so in that reply rather than leave you waiting.
              </dd>
            </div>
            <div className="bg-surface p-6">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
                Working hours
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink">
                UTC+8, Cebu City. Mornings overlap Australia and New Zealand;
                evenings reach the US West Coast. Async by default.
              </dd>
            </div>
            <div className="bg-surface p-6">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-slate">
                Availability
              </dt>
              <dd className="mt-2 flex items-start gap-2 text-[0.9375rem] leading-relaxed text-ink">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-measure" />
                <span>
                  Taking on new projects and open to full-time remote roles.
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <section>
              <h2 className="font-display text-heading font-semibold text-ink">
                Good fit
              </h2>
              <ul className="mt-5 space-y-3 border-t border-rule pt-5">
                {goodFits.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_1fr] gap-2 text-[1.0625rem] leading-relaxed text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-3 bg-ink"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-heading font-semibold text-ink">
                Not my strength
              </h2>
              <ul className="mt-5 space-y-3 border-t border-rule pt-5">
                {notFits.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-[1.25rem_1fr] gap-2 text-[1.0625rem] leading-relaxed text-graphite"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-3 bg-rule-strong"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-8 font-mono text-[0.75rem]">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              GitHub
            </a>
            <a
              href="/resume/john-lloyd-lawas-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Résumé (PDF)
            </a>
            <span className="text-slate">Cebu City, Philippines · UTC+8</span>
          </div>
        </div>
      </Container>
    </>
  );
}
