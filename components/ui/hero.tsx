'use client';

import { headlineOutcomes } from '@/data/outcomes';
import { personalInfo } from '@/data/personal';
import { getTotalExperience } from '@/lib/utils';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button, Container, Eyebrow } from './primitives';
import { DeltaRule } from './primitives/delta-rule';

export default function Hero() {
  const years = getTotalExperience();
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
    <section className="border-b border-rule">
      <Container>
        <div className="pt-14 pb-14 sm:pt-20 sm:pb-16">
          <div className="rise flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-measure opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-measure" />
            </span>
            <Eyebrow>
              Available for new projects · Cebu City, UTC+8 · {years} years
            </Eyebrow>
          </div>

          <h1
            className="rise mt-8 max-w-[21ch] font-display text-display font-semibold text-ink"
            style={{ animationDelay: '60ms' }}
          >
            I make aging software fast again — and build AI products that hold
            up in production.
          </h1>

          <p
            data-hero-subcopy
            className="rise mt-8 max-w-[58ch] text-lg leading-relaxed text-graphite"
            style={{ animationDelay: '120ms' }}
          >
            {years} years of full-stack engineering, from ASP.NET Core and
            Angular through to React, Next.js and LLM-backed product work. I
            take on platforms that have slowed to a crawl, and new products
            that need to ship. Remote from the Philippines, working across
            every timezone.
          </p>

          {/* One sourced figure as proof. It is the -50% in data/outcomes.ts. */}
          <p
            data-hero-proof
            className="rise mt-4 max-w-[58ch] text-[1.0625rem] leading-relaxed text-graphite"
            style={{ animationDelay: '150ms' }}
          >
            Cut application load time by{' '}
            <span className="font-medium text-measure tabular-nums">50%</span>{' '}
            across 5+ ASP.NET applications (2019–2022).
          </p>

          <div
            data-hero-ctas
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '180ms' }}
          >
            <Button href="/projects" variant="primary">
              See the work
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
            <Button href="/contact" variant="ghost">
              Start a project
            </Button>
          </div>

          <div
            data-hero-email
            className="rise mt-3 flex flex-wrap items-center gap-x-1"
            style={{ animationDelay: '210ms' }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-mono text-[0.8125rem] text-graphite underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink touch:inline-flex touch:min-h-11 touch:items-center"
            >
              {personalInfo.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] text-graphite transition-colors hover:text-ink"
            >
              {copied ? (
                <Check size={14} strokeWidth={2} className="text-ink" />
              ) : (
                <Copy size={14} strokeWidth={1.75} />
              )}
            </button>
            <span
              role="status"
              aria-live="polite"
              className="font-body text-[0.8125rem] text-graphite"
            >
              {copied ? 'Copied' : ''}
            </span>
          </div>
        </div>

        {/* The delta band. Every figure here was measured on shipped work. */}
        <div className="border-t border-rule py-12 sm:py-14">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Eyebrow>Measured outcomes</Eyebrow>
            <p className="font-body text-[0.875rem] text-slate">
              Every figure below was measured on shipped work.
            </p>
          </div>

          <div className="grid gap-10 sm:gap-8 lg:grid-cols-3 lg:gap-12">
            {headlineOutcomes.map((delta, i) => (
              <DeltaRule key={delta.label} delta={delta} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
