import Footer from "@/components/ui/footer";
import Navigation from "@/components/ui/navigation";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { personalInfo } from "@/data/personal";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://johnlloydlawas.com'),
  title: {
    default: `${personalInfo.name} - ${personalInfo.title}`,
    template: `%s - ${personalInfo.name}`,
  },
  description: `${personalInfo.summary} Available for remote work and international opportunities.`,
  keywords: [
    "Full Stack Developer",
    "ASP.NET Core Developer",
    "Angular Developer",
    "Enterprise Web Applications",
    "C# Developer",
    "TypeScript",
    "Remote Developer",
    "Software Engineer",
    "Web Development",
    "API Development",
    "Frontend Developer",
    "Backend Developer",
    "Legacy System Modernization",
    "Enterprise Software Development",
    "Agile Development",
    "Philippines Developer",
    "Remote Work",
    "International Developer",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.linkedin }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnlloydlawas.com",
    siteName: personalInfo.name,
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: `${personalInfo.summary} Experienced in remote collaboration and available for international projects.`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: `${personalInfo.summary} Open to remote work and global opportunities.`,
    images: ["/images/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalInfo.name,
    "jobTitle": personalInfo.title,
    "description": personalInfo.summary,
    "url": "https://johnlloydlawas.com",
    "sameAs": [
      personalInfo.linkedin,
      `mailto:${personalInfo.email}`
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cebu City",
      "addressCountry": "Philippines"
    },
    "knowsAbout": [
      "ASP.NET Core",
      "Angular",
      "C#",
      "TypeScript",
      "Full Stack Development",
      "Enterprise Applications",
      "Remote Work",
      "Software Engineering"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
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
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="min-h-screen transition-colors duration-300">
            <Navigation />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
