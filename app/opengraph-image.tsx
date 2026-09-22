import { headlineOutcomes } from '@/data/outcomes';
import { personalInfo } from '@/data/personal';
import { ImageResponse } from 'next/og';

export const alt = `${personalInfo.name} — ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Mirrors the Instrument light palette in app/globals.css. Satori cannot read
   CSS variables, so these are duplicated deliberately — change both together. */
const PAPER = '#EBEDEF';
const SURFACE = '#FFFFFF';
const INK = '#14181D';
const GRAPHITE = '#59626D';
const SLATE = '#8A939E';
const RULE = '#D3D8DE';
const SUNK = '#E3E6EA';
const MEASURE = '#0B6E52';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          color: INK,
          padding: 64,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 21,
            color: GRAPHITE,
          }}
        >
          <span style={{ color: INK, fontWeight: 600 }}>{personalInfo.name}</span>
          <span>johnlloydlawas.com</span>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            maxWidth: 940,
          }}
        >
          I make aging software fast again — and build AI products that hold up
          in production.
        </div>

        {/* The delta rule, the same instrument the site leads with. */}
        <div
          style={{
            display: 'flex',
            gap: 1,
            background: RULE,
            border: `1px solid ${RULE}`,
          }}
        >
          {headlineOutcomes.map((d) => {
            const span = Math.max(1, d.ratio);
            return (
              <div
                key={d.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  background: SURFACE,
                  padding: '22px 24px',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: SLATE,
                      maxWidth: 150,
                    }}
                  >
                    {d.label}
                  </span>
                  <span style={{ fontSize: 40, fontWeight: 600, color: MEASURE }}>
                    {d.figure}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', height: 6, background: SUNK }}>
                    <div
                      style={{
                        width: `${(1 / span) * 100}%`,
                        height: '100%',
                        background: SLATE,
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', height: 6, background: SUNK }}>
                    <div
                      style={{
                        width: `${(d.ratio / span) * 100}%`,
                        height: '100%',
                        background: MEASURE,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            color: GRAPHITE,
          }}
        >
          <span>
            ASP.NET Core &middot; Angular &middot; TypeScript &middot; React
            &middot; Next.js
          </span>
          <span>Cebu City, PH &middot; UTC+8 &middot; Available</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
