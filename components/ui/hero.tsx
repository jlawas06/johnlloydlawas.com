'use client';

import { personalInfo } from '@/data/personal';
import { cn, getTotalExperience } from '@/lib/utils';
import { ArrowUpRight, Copy, Check, Download, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { openCommandPalette } from './command-palette';
import Kbd from './kbd';
import TerminalWindow from './terminal-window';

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: personalInfo.name },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: personalInfo.title },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'out', text: 'asp.net-core · angular · c# · typescript · sql-server · azure' },
  { type: 'cmd', text: 'cat workflow.txt' },
  { type: 'out', text: 'cursor · claude-code · openai · claude · gemini · chrome-extensions' },
];

export default function Hero() {
  const years = getTotalExperience();
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="mx-auto w-full max-w-5xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span>available for remote work</span>
          <span className="text-border-strong">·</span>
          <span>cebu city, ph (utc+8)</span>
          <span className="text-border-strong">·</span>
          <span>{years}+ yrs full-stack</span>
        </div>

        <TerminalWindow title="~/johnlloyd — zsh" className="reveal">
          <div className="space-y-1 font-mono text-sm sm:text-[15px] leading-relaxed">
            {LINES.map((line, i) =>
              line.type === 'cmd' ? (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="select-none text-accent">$</span>
                  <span className="text-foreground">{line.text}</span>
                </div>
              ) : (
                <div key={i} className="pl-4 text-muted-foreground">
                  {line.text}
                </div>
              )
            )}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="select-none text-accent">$</span>
              <span className="caret" aria-hidden="true" />
            </div>
          </div>
        </TerminalWindow>

        <div className="mt-8 space-y-5 reveal" style={{ animationDelay: '80ms' }}>
          <h1 className="max-w-3xl text-balance font-mono text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            i build{' '}
            <span className="text-accent">enterprise web apps</span>{' '}
            with asp.net core and angular—modernizing legacy systems and shipping maintainable full-stack solutions.
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {personalInfo.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Link
              href="/projects"
              className={cn(
                'group inline-flex items-center gap-2 rounded border border-accent bg-accent px-3.5 py-2 font-mono text-xs text-accent-foreground transition-colors hover:bg-accent-muted hover:text-accent'
              )}
            >
              view projects
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={copyEmail}
              className="group inline-flex items-center gap-2 rounded border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground transition-colors hover:border-border-strong"
            >
              {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
              {copied ? 'copied!' : 'copy email'}
            </button>
            <Link
              href="/resume/john-lloyd-lawas-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground transition-colors hover:border-border-strong"
            >
              <Download size={14} />
              résumé.pdf
            </Link>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground transition-colors hover:border-border-strong"
            >
              <Linkedin size={14} />
              linkedin
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 rounded border border-border bg-card px-3.5 py-2 font-mono text-xs text-foreground transition-colors hover:border-border-strong"
            >
              <Mail size={14} />
              mail
            </a>
          </div>

          <p className="pt-2 text-xs text-muted-foreground">
            press{' '}
            <button
              type="button"
              onClick={() => openCommandPalette()}
              className="inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground hover:border-border-strong"
            >
              <Kbd>{isMac ? '⌘' : 'ctrl'}</Kbd>
              <Kbd>K</Kbd>
            </button>{' '}
            to jump anywhere, or{' '}
            <Kbd>g</Kbd> then <Kbd>h / a / e / s / p / b / c</Kbd>
          </p>
        </div>
      </div>
    </section>
  );
}
