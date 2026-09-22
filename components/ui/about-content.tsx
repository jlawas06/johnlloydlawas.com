import { Button, Container, Eyebrow, Rail } from '@/components/ui/primitives';
import { personalInfo } from '@/data/personal';
import { topSkills } from '@/data/skills';
import { getTotalExperience } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Chip } from './primitives';

const principles = [
  {
    title: 'Boring technology',
    body: 'Shipped beats clever. Whether it is .NET and SQL Server or React and Supabase, I pick the stack that stays calm under load and is unsurprising to operate at 3am.',
  },
  {
    title: 'Readable code',
    body: 'Other people — including future me — have to maintain this. Honest naming, small functions and comments that explain why beat cleverness every time.',
  },
  {
    title: 'Measurable impact',
    body: 'I like making things faster, safer and more obvious. "This query is eight times faster now" is more satisfying to me than any new feature.',
  },
  {
    title: 'Async collaboration',
    body: 'Clear pull requests, short recordings, written decisions. I optimise for teams that can ship without everyone being online at the same hour.',
  },
];

export default function AboutContent() {
  const totalYears = getTotalExperience();

  return (
    <>
      <header className="border-b border-rule">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div>
              <Eyebrow className="mb-4">About</Eyebrow>
              <h1 className="max-w-[16ch] font-display text-title font-semibold text-ink">
                Hello — I&apos;m John Lloyd.
              </h1>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite">
                {personalInfo.bio}
              </p>
            </div>

            <Rail
              className="lg:border-l lg:border-rule lg:pl-8"
              items={[
                { label: 'Role', value: personalInfo.title },
                { label: 'Based in', value: 'Cebu City, Philippines' },
                { label: 'Timezone', value: 'UTC+8' },
                { label: 'Experience', value: `${totalYears} years` },
                {
                  label: 'Status',
                  value: (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-measure" />
                      Available
                    </span>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </header>

      <Container>
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <div className="min-w-0 max-w-[62ch]">
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink">
              <p>
                I&apos;ve spent {totalYears} years building production software.
                Most of that was on enterprise .NET and Angular platforms — ERP,
                aviation logistics, manufacturing process apps — and the last
                stretch has been AI-integrated Chrome extensions and SaaS
                products at Liftoff Company Inc. Two very different eras, same
                habits: ship it, keep it maintainable, make the impact
                measurable.
              </p>
              <p>
                I started at Lear Corporation as an intern building internal
                apps for automotive manufacturing. Since then I&apos;ve shipped
                software for airlines through Sense Software Solutions in
                Singapore, modernised legacy systems at OSL International,
                delivered to hard deadlines at Yondu, led full-stack work at
                Nowcom Global Services, and now build AI-powered extensions and
                SaaS tools at Liftoff.
              </p>
              <p>
                Remote has been my default for years. I&apos;ve worked across
                Philippine, Singaporean and US timezones, reviewed code with
                people I have never met in person, and learned to lean on
                written handoffs. My mornings overlap Australian and New Zealand
                business hours and US West Coast evenings; my late evenings
                reach US morning standups.
              </p>
            </div>

            <section className="mt-14">
              <h2 className="font-display text-heading font-semibold text-ink">
                What I care about
              </h2>
              <dl className="mt-6 divide-y divide-rule border-y border-rule">
                {principles.map((item) => (
                  <div key={item.title} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate sm:pt-1">
                      {item.title}
                    </dt>
                    <dd className="text-[1.0625rem] leading-relaxed text-ink">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-heading font-semibold text-ink">
                Outside of code
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
                Coffee, reading, and keeping{' '}
                <Link
                  href="/now"
                  className="underline decoration-rule-strong underline-offset-4 hover:decoration-ink"
                >
                  the now page
                </Link>{' '}
                current with whatever I am building or breaking this month.
              </p>
            </section>

            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Start a project
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="/projects" variant="ghost">
                See the work
              </Button>
              <Button href="/experience" variant="ghost">
                Full experience
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Eyebrow className="mb-4">Reach for daily</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <Link
              href="/skills"
              className="mt-5 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink"
            >
              Full stack breakdown
            </Link>
          </aside>
        </div>
      </Container>
    </>
  );
}
