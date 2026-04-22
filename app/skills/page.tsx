import Section from '@/components/ui/section';
import Tag from '@/components/ui/tag';
import { skillCategories, topSkills, type Skill } from '@/data/skills';
import { personalInfo } from '@/data/personal';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: `Technical skills and expertise of ${personalInfo.name}. Overview of full-stack development capabilities including ASP.NET Core, Angular, C#, TypeScript, and SQL Server.`,
};

function levelClass(level: Skill['level']) {
  switch (level) {
    case 'core':
      return 'border-accent/40 text-accent bg-accent-muted';
    case 'proficient':
      return 'border-border-strong text-foreground bg-card';
    case 'familiar':
    default:
      return 'border-border text-muted-foreground bg-card';
  }
}

function SkillLine({ skill }: { skill: Skill }) {
  const slug = skill.slug ?? skill.name.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <div className="flex min-w-0 items-baseline gap-2">
        <span className={cn('inline-flex h-1.5 w-1.5 shrink-0 rounded-full', {
          'bg-accent': skill.level === 'core',
          'bg-foreground': skill.level === 'proficient',
          'bg-muted-foreground': skill.level === 'familiar',
        })} />
        <span className="truncate font-mono text-sm text-foreground">{slug}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <span>
          {skill.years}y
        </span>
        <span
          className={cn(
            'rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-widest',
            levelClass(skill.level)
          )}
        >
          {skill.level}
        </span>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const all = skillCategories.flatMap((c) => c.skills);
  const core = all.filter((s) => s.level === 'core');

  return (
    <Section
      label="skills"
      title="technical stack"
      description="What I reach for daily, and what I keep sharp for when a project asks."
    >
      <div className="mb-10 rounded border border-border bg-card p-5">
        <div className="mb-3 font-mono text-[11px] text-muted-foreground">
          <span className="text-accent">$</span> cat{' '}
          <span className="text-foreground">top-skills.txt</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {topSkills.map((s) => (
            <Tag key={s} variant="accent" className="px-2 py-1 text-xs">
              {s.toLowerCase()}
            </Tag>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> core — daily
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> proficient — regular
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> familiar — shipped
          </span>
          <span className="ml-auto">{all.length} technologies · {core.length} core</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="rounded border border-border bg-card p-5"
          >
            <header className="mb-3 border-b border-border pb-3">
              <h3 className="font-mono text-sm text-foreground">
                <span className="text-accent">{'>'}</span> {category.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {category.description}
              </p>
            </header>
            <div>
              {category.skills.map((skill) => (
                <SkillLine key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
