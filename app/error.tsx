'use client';

import { Button, Container, Eyebrow } from '@/components/ui/primitives';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <div className="max-w-2xl py-24 sm:py-32">
        <Eyebrow className="mb-4">Error</Eyebrow>
        <h1 className="font-display text-title font-semibold text-ink">
          Something broke on this page.
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-graphite">
          Not your fault. Reloading usually clears it. If it keeps happening,
          email me and tell me which page you were on.
        </p>
        {error.digest && (
          <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-slate">
            Reference {error.digest}
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button href="/" variant="ghost">
            Back to the homepage
          </Button>
        </div>
      </div>
    </Container>
  );
}
