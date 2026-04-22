import CommandPalette from "@/components/ui/command-palette";
import Footer from "@/components/ui/footer";
import Navigation from "@/components/ui/navigation";
import { ThemeProvider, themeScript } from "@/components/ui/theme-provider";
import { personalInfo } from "@/data/personal";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://johnlloydlawas.com"),
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s — ${personalInfo.name}`,
  },
  description: personalInfo.summary,
  keywords: [
    "Full Stack Developer",
    "ASP.NET Core",
    "Angular",
    "C# Developer",
    "TypeScript",
    "Remote Developer",
    "Software Engineer",
    "Enterprise Web Applications",
    "Philippines Developer",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnlloydlawas.com",
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
    url: "https://johnlloydlawas.com",
    sameAs: [personalInfo.linkedin, `mailto:${personalInfo.email}`],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressCountry: "Philippines",
    },
    knowsAbout: [
      "ASP.NET Core",
      "Angular",
      "C#",
      "TypeScript",
      "Full Stack Development",
      "Enterprise Applications",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-mono antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <CommandPalette />
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 pt-14">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
