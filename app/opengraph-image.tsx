import { personalInfo } from '@/data/personal';
import { ImageResponse } from 'next/og';

export const alt = `${personalInfo.name} — ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          color: '#ededed',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          padding: 64,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundImage:
            'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 22,
          }}
        >
          <span style={{ color: '#7ee787' }}>~/</span>
          <span>johnlloyd</span>
          <span style={{ marginLeft: 'auto', color: '#a1a1aa' }}>
            johnlloydlawas.com
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            background: '#0f0f10',
            border: '1px solid #27272a',
            borderRadius: 12,
            padding: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#a1a1aa',
              fontSize: 20,
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: '#3f3f46',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: '#3f3f46',
                }}
              />
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: '#3f3f46',
                }}
              />
            </div>
            <span>~/johnlloyd &mdash; zsh</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: 26,
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ color: '#7ee787' }}>$</span>
              <span>whoami</span>
            </div>
            <div
              style={{
                display: 'flex',
                color: '#ededed',
                paddingLeft: 28,
                fontSize: 54,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {personalInfo.name}
            </div>
            <div
              style={{
                display: 'flex',
                color: '#a1a1aa',
                paddingLeft: 28,
                fontSize: 28,
              }}
            >
              {personalInfo.title} &middot; Cebu City, PH
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 8,
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#7ee787' }}>$</span>
              <span
                style={{
                  width: 16,
                  height: 28,
                  background: '#7ee787',
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#a1a1aa',
            fontSize: 18,
          }}
        >
          <span>asp.net core &middot; angular &middot; c# &middot; typescript &middot; sql server</span>
          <span style={{ color: '#7ee787' }}>available</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
