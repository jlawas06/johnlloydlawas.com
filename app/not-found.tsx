import { Button, Container, Eyebrow } from '@/components/ui/primitives';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container>
      <div className="max-w-2xl py-24 sm:py-32">
        <Eyebrow className="mb-4">404</Eyebrow>
        <h1 className="font-display text-title font-semibold text-ink">
          That page isn&apos;t here.
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-graphite">
          The link is either out of date or was never right. The case studies
          and writing are both one click away.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Back to the homepage
          </Button>
          <Button href="/projects" variant="ghost">
            See the work
          </Button>
        </div>
      </div>
    </Container>
  );
}
