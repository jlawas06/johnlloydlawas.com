'use client';

import { personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';
import { Command } from 'cmdk';
import {
  ArrowRight,
  Briefcase,
  Check,
  Code,
  Copy,
  ExternalLink,
  FileText,
  Home,
  Linkedin,
  Mail,
  Moon,
  PenLine,
  Rocket,
  Sun,
  User,
  Wrench,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Kbd from './kbd';
import { useTheme } from './theme-provider';

type ActionGroup = {
  heading: string;
  items: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    shortcut?: string[];
    run: () => void | Promise<void>;
  }>;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router]
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  }, []);

  // ⌘K / Ctrl+K to toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Vim-style `g + key` navigation (g h/a/e/s/p/b/c/n/u)
  useEffect(() => {
    let lastG = 0;
    const map: Record<string, string> = {
      h: '/',
      a: '/about',
      e: '/experience',
      s: '/skills',
      p: '/projects',
      b: '/blog',
      c: '/contact',
      n: '/now',
      u: '/uses',
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'g') {
        lastG = Date.now();
        return;
      }
      if (Date.now() - lastG < 800 && map[e.key]) {
        e.preventDefault();
        router.push(map[e.key]);
        lastG = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  // Listen for custom event to open the palette (nav button)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('command-palette:open', onOpen);
    return () => window.removeEventListener('command-palette:open', onOpen);
  }, []);

  const groups: ActionGroup[] = [
    {
      heading: 'Navigate',
      items: [
        { id: 'nav-home', label: 'Home', icon: Home, shortcut: ['g', 'h'], run: () => navigate('/') },
        { id: 'nav-about', label: 'About', icon: User, shortcut: ['g', 'a'], run: () => navigate('/about') },
        { id: 'nav-experience', label: 'Experience', icon: Briefcase, shortcut: ['g', 'e'], run: () => navigate('/experience') },
        { id: 'nav-skills', label: 'Skills', icon: Code, shortcut: ['g', 's'], run: () => navigate('/skills') },
        { id: 'nav-projects', label: 'Projects', icon: Rocket, shortcut: ['g', 'p'], run: () => navigate('/projects') },
        { id: 'nav-blog', label: 'Blog', icon: PenLine, shortcut: ['g', 'b'], run: () => navigate('/blog') },
        { id: 'nav-contact', label: 'Contact', icon: Mail, shortcut: ['g', 'c'], run: () => navigate('/contact') },
        { id: 'nav-now', label: 'Now', icon: ArrowRight, shortcut: ['g', 'n'], run: () => navigate('/now') },
        { id: 'nav-uses', label: 'Uses', icon: Wrench, shortcut: ['g', 'u'], run: () => navigate('/uses') },
      ],
    },
    {
      heading: 'Actions',
      items: [
        {
          id: 'copy-email',
          label: copied ? 'Copied!' : `Copy email (${personalInfo.email})`,
          icon: copied ? Check : Copy,
          run: async () => {
            await copyEmail();
          },
        },
        {
          id: 'toggle-theme',
          label: theme === 'dark' ? 'Switch to light' : 'Switch to dark',
          icon: theme === 'dark' ? Sun : Moon,
          run: () => {
            toggleTheme();
            setOpen(false);
          },
        },
        {
          id: 'open-resume',
          label: 'Download résumé (PDF)',
          icon: FileText,
          run: () => {
            window.open('/resume/john-lloyd-lawas-resume.pdf', '_blank', 'noopener,noreferrer');
            setOpen(false);
          },
        },
      ],
    },
    {
      heading: 'Links',
      items: [
        {
          id: 'link-linkedin',
          label: 'LinkedIn',
          icon: Linkedin,
          run: () => {
            window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer');
            setOpen(false);
          },
        },
        {
          id: 'link-mailto',
          label: 'Send email',
          icon: ExternalLink,
          run: () => {
            window.location.href = `mailto:${personalInfo.email}`;
            setOpen(false);
          },
        },
      ],
    },
  ];

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh] sm:pt-[20vh]"
    >
      <button
        type="button"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <Command
        label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-md border border-border bg-card font-mono shadow-2xl"
        loop
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <span className="select-none text-accent">{'>'}</span>
          <Command.Input
            autoFocus
            placeholder="Type a command or search…"
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none focus:outline-none focus-visible:outline-none placeholder:text-muted-foreground"
          />
          <Kbd>esc</Kbd>
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-xs text-muted-foreground">
            No results.
          </Command.Empty>
          {groups.map((group) => (
            <Command.Group
              key={group.heading}
              heading={group.heading}
              className={cn(
                '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1',
                '[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground'
              )}
            >
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.id}
                    value={`${group.heading} ${item.label}`}
                    onSelect={() => item.run()}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm text-muted-foreground',
                      'data-[selected=true]:bg-muted data-[selected=true]:text-foreground'
                    )}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.shortcut && (
                      <span className="flex items-center gap-1">
                        {item.shortcut.map((k, i) => (
                          <Kbd key={i}>{k}</Kbd>
                        ))}
                      </span>
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>
          ))}
        </Command.List>
        <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Kbd>↵</Kbd> to select
            <span className="ml-2 flex items-center gap-1">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd> to navigate
            </span>
          </span>
          <span>
            press <Kbd>g</Kbd> then a letter to jump
          </span>
        </div>
      </Command>
    </div>
  );
}

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent('command-palette:open'));
}
