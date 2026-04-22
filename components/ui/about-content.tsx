import Section from '@/components/ui/section';
import Tag from '@/components/ui/tag';
import TerminalWindow from '@/components/ui/terminal-window';
import { personalInfo } from '@/data/personal';
import { topSkills } from '@/data/skills';
import { getTotalExperience } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutContent() {
  const totalYears = getTotalExperience();

  return (
    <Section
      label="about"
      title="hello, i'm john lloyd."
      description={personalInfo.bio}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            I&apos;ve spent <span className="text-foreground">{totalYears}+ years</span> building production software — most of that on enterprise{' '}
            <span className="text-foreground">.NET</span> and <span className="text-foreground">Angular</span> platforms (ERP, aviation logistics,
            manufacturing process apps), and the last year on <span className="text-foreground">AI-integrated Chrome extensions</span> and{' '}
            <span className="text-foreground">SaaS products</span> at Liftoff Company Inc. Two eras, same habits: ship it, keep it maintainable, make
            the impact measurable.
          </p>
          <p>
            I started at{' '}
            <span className="text-foreground">Lear Corporation</span> as an intern, building internal apps for automotive manufacturing. Since then I&apos;ve shipped software for airlines via{' '}
            <span className="text-foreground">Sense Software Solutions</span> in Singapore, modernized legacy systems at{' '}
            <span className="text-foreground">OSL International</span>, delivered to deadline at{' '}
            <span className="text-foreground">Yondu</span>, led full-stack work at{' '}
            <span className="text-foreground">Nowcom Global Services</span>, and now build AI-powered Chrome extensions and SaaS tools at{' '}
            <span className="text-foreground">Liftoff Company Inc.</span>
          </p>
          <p>
            Remote has been the default for me for a while — I&apos;ve collaborated across PH/SG/US time zones, done code reviews with teams I&apos;ve
            never met in person, and learned to rely on written handoffs. If you work async, I&apos;ll fit right in.
          </p>

          <h3 className="mt-8 font-mono text-sm text-foreground">
            <span className="text-accent">{'>'}</span> what i care about
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="shrink-0 select-none font-mono text-accent">›</span>
              <span>
                <span className="text-foreground">boring technology.</span> Shipped trumps clever. Whether it&apos;s .NET and SQL Server or
                React and Supabase, I pick the stack that&apos;s calm under load and unsurprising to operate.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 select-none font-mono text-accent">›</span>
              <span>
                <span className="text-foreground">readable code.</span> Other humans (including future me) have to maintain this. Naming, small
                functions, and honest comments beat cleverness every time.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 select-none font-mono text-accent">›</span>
              <span>
                <span className="text-foreground">measurable impact.</span> I like making things faster, safer, and more obvious. &quot;This query is
                8× faster now&quot; is more satisfying than any new feature.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 select-none font-mono text-accent">›</span>
              <span>
                <span className="text-foreground">collaborative async.</span> Clear PRs, short Looms, well-written docs. I optimize for teams that
                can ship without everyone being online at the same time.
              </span>
            </li>
          </ul>

          <h3 className="mt-8 font-mono text-sm text-foreground">
            <span className="text-accent">{'>'}</span> outside of code
          </h3>
          <p>
            Based in Cebu City, Philippines. Coffee, reading, and keeping{' '}
            <Link href="/now" className="text-accent underline-offset-4 hover:underline">
              ./now
            </Link>{' '}
            up to date with whatever I&apos;m currently building or breaking.
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1 rounded border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground hover:border-border-strong"
            >
              full experience
              <ArrowUpRight size={12} />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 rounded border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground hover:border-border-strong"
            >
              projects
              <ArrowUpRight size={12} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 rounded border border-accent bg-accent px-3 py-1.5 font-mono text-xs text-accent-foreground hover:bg-accent-muted hover:text-accent"
            >
              get in touch
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </article>

        <aside className="space-y-4">
          <TerminalWindow title="whoami" bodyClassName="p-4 font-mono text-xs">
            <div className="space-y-1">
              <Row k="name" v={personalInfo.name} />
              <Row k="role" v={personalInfo.title} />
              <Row k="where" v="cebu city, ph" />
              <Row k="tz" v="utc+8" />
              <Row k="years" v={`${totalYears}+`} />
              <Row k="status" v="available" accent />
            </div>
          </TerminalWindow>

          <div className="rounded border border-border bg-card p-4">
            <div className="mb-2 font-mono text-[11px] text-muted-foreground">
              <span className="text-accent">{'//'}</span> top stack
            </div>
            <div className="flex flex-wrap gap-1">
              {topSkills.map((s) => (
                <Tag key={s}>{s.toLowerCase()}</Tag>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Row({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[70px_1fr] gap-2">
      <span className="text-muted-foreground">{k}:</span>
      <span className={accent ? 'text-accent' : 'text-foreground'}>{v}</span>
    </div>
  );
}
