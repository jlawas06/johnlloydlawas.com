import { Chip, Container, Eyebrow } from '@/components/ui/primitives';
import { personalInfo } from '@/data/personal';
import { skillCategories, topSkills, type Skill } from '@/data/skills';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack',
  description: `${personalInfo.name}'s full-stack toolkit: ASP.NET Core, Angular, C#, TypeScript, React, Next.js, SQL Server, Azure, and LLM integration.`,
};

/**
 * This page is entirely data, so mono is the right face throughout — it is the
 * one place the type rule permits a full monospace layout.
 */
function SkillRow({ skill }: { skill: Skill }) {
  const name = skill.slug ?? skill.name;
  return (
    <div className="flex items-baseline gap-3 border-b border-rule py-2 last:border-b-0">
      <span
        className={cn('h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full', {
          'bg-ink': skill.level === 'core',
          'bg-graphite': skill.level === 'proficient',
          'bg-rule-strong': skill.level === 'familiar',
        })}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate font-mono text-[0.8125rem] text-ink">
        {name}
      </span>
      <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-slate">
        {skill.years}y
      </span>
      <span className="w-20 shrink-0 text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-slate">
        {skill.level}
      </span>
    </div>
  );
}

export default function SkillsPage() {
  const all = skillCategories.flatMap((c) => c.skills);
  const core = all.filter((s) => s.level === 'core');

  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="max-w-3xl py-16 sm:py-20">
            <Eyebrow className="mb-4">Stack</Eyebrow>
            <h1 className="font-display text-title font-semibold text-ink">
              What I build with
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-graphite">
              What I reach for daily, and what I keep sharp for when a project
              asks. Years are time spent shipping with it, not time spent
              reading about it.
            </p>

            <div className="mt-9 flex flex-wrap gap-1.5">
              {topSkills.map((s) => (
                <Chip key={s} className="border-rule-strong text-ink">
                  {s}
                </Chip>
              ))}
            </div>
          </div>
        </Container>
      </header>

      <Container>
        <div className="py-12 sm:py-14">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-rule pb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-slate">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Core — daily
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-graphite" />
              Proficient — regular
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rule-strong" />
              Familiar — shipped with it
            </span>
            <span className="ml-auto normal-case tracking-normal">
              {all.length} technologies · {core.length} core
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {skillCategories.map((category) => (
              <section key={category.name}>
                <h2 className="font-display text-[1.0625rem] font-semibold text-ink">
                  {category.name}
                </h2>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite">
                  {category.description}
                </p>
                <div className="mt-4 border-t border-rule">
                  {category.skills.map((skill) => (
                    <SkillRow key={skill.name} skill={skill} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
