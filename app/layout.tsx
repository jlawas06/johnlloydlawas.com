import CommandPalette from "@/components/ui/command-palette";
import Footer from "@/components/ui/footer";
import N8nChat from "@/components/ui/n8n-chat";
import Navigation from "@/components/ui/navigation";
import { ThemeProvider, themeScript } from "@/components/ui/theme-provider";
import { personalInfo } from "@/data/personal";
import { SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

/* Display: expanded grotesque, used for headings and UI chrome. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

/* Body: editorial serif, used for prose and descriptions. */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

/* Data: reserved for figures, dates, labels and code. Never body copy. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebedef" },
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s — ${personalInfo.name}`,
  },
  description: personalInfo.metaDescription,
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "Blog RSS feed" }],
    },
  },
  authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: personalInfo.name,
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.summary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — ${personalInfo.title}`,
    description: personalInfo.summary,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.summary,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${personalInfo.email}`,
    sameAs: [personalInfo.linkedin, personalInfo.github],
    worksFor: {
      "@type": "Organization",
      name: "Liftoff Company Inc.",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressCountry: "PH",
    },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "ASP.NET Core",
      "Angular",
      "C#",
      "SQL Server",
      "Azure",
      "Chrome Extensions",
      "Supabase",
      "LLM Integration",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${archivo.variable} ${newsreader.variable} ${jetbrainsMono.variable} bg-paper font-body text-ink antialiased`}
      >
        <ThemeProvider>
          <CommandPalette />
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <N8nChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
