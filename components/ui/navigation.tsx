'use client';

import { cn } from '@/lib/utils';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { openCommandPalette } from './command-palette';
import Kbd from './kbd';
import ThemeToggle from './theme-toggle';

const navigationItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/experience', label: 'experience' },
  { href: '/skills', label: 'skills' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
  { href: '/uses', label: 'uses' },
  { href: '/contact', label: 'contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 4);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all',
        isScrolled
          ? 'border-b border-border bg-background/75 backdrop-blur-md'
          : 'border-b border-transparent bg-background/40 backdrop-blur-sm'
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center gap-2 font-mono text-sm font-medium text-foreground"
        >
          <span className="text-accent">~/</span>
          <span className="hidden sm:inline">johnlloyd</span>
          <span className="sm:hidden">jl</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded px-2 py-1 font-mono text-[13px] transition-colors',
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="text-subtle">./</span>
              {item.label}
              {isActive(item.href) && (
                <span className="ml-0.5 text-accent">●</span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => openCommandPalette()}
            aria-label="Open command palette"
            className="group hidden items-center gap-2 rounded border border-border bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:inline-flex"
          >
            <Search size={12} />
            <span>search</span>
            <span className="flex items-center gap-0.5">
              <Kbd>{isMac ? '⌘' : 'ctrl'}</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>

          <button
            type="button"
            onClick={() => openCommandPalette()}
            aria-label="Open command palette"
            className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground sm:hidden"
          >
            <Search size={16} />
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto w-full max-w-5xl px-4 py-3 sm:px-6">
            <div className="grid grid-cols-2 gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded px-2 py-2 font-mono text-sm transition-colors',
                    isActive(item.href)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span className="text-subtle">./</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
