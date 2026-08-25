'use client';

import { cn } from '@/lib/utils';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { openCommandPalette } from './command-palette';
import { Container } from './primitives';
import ThemeToggle from './theme-toggle';

const navigationItems = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
        isScrolled
          ? 'border-b border-rule bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent bg-paper/60 backdrop-blur-sm'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Home"
            className="font-display text-[0.9375rem] font-semibold leading-none tracking-tight text-ink"
          >
            <span className="hidden sm:inline">John Lloyd Lawas</span>
            <span className="sm:hidden">J. L. Lawas</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'relative py-1 font-display text-[0.8125rem] transition-colors',
                  isActive(item.href)
                    ? 'font-medium text-ink'
                    : 'text-graphite hover:text-ink'
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-ink" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => openCommandPalette()}
              aria-label="Search"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-graphite transition-colors hover:bg-surface hover:text-ink"
            >
              <Search size={15} strokeWidth={1.75} />
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] text-graphite transition-colors hover:bg-surface hover:text-ink md:hidden"
            >
              {isOpen ? <X size={17} strokeWidth={1.75} /> : <Menu size={17} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>
      </Container>

      {isOpen && (
        <div className="border-t border-rule bg-paper md:hidden">
          <Container>
            <div className="flex flex-col py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'border-b border-rule py-3 font-display text-[0.9375rem] last:border-b-0',
                    isActive(item.href) ? 'font-medium text-ink' : 'text-graphite'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
