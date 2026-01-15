import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KeywordGenerators - AI-Powered Keyword Research',
  description: 'Get personalized keywords with Business Fit Scores tailored to your platform, goals, and strategy. AI-powered keyword research that fits YOUR business.',
  keywords: ['keyword research', 'SEO tools', 'AI keywords', 'business fit score', 'keyword generator', 'content marketing', 'SEO strategy'],
  authors: [{ name: 'KeywordGenerators' }],
  creator: 'KeywordGenerators',
  publisher: 'KeywordGenerators',
  metadataBase: new URL('https://keywordgenerators.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://keywordgenerators.com',
    title: 'KeywordGenerators - AI-Powered Keyword Research',
    description: 'Get personalized keywords with Business Fit Scores tailored to your platform and goals',
    siteName: 'KeywordGenerators',
    images: [
      {
        url: '/logo.svg',
        width: 2400,
        height: 600,
        alt: 'KeywordGenerators Logo - AI-Powered Keyword Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeywordGenerators - AI-Powered Keyword Research',
    description: 'Get personalized keywords with Business Fit Scores',
    images: ['/logo.svg'],
    creator: '@keywordgen',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="canonical" href="https://keywordgenerators.com" />
        </head>
        <body className={inter.className}>
          {children}

          {/* Tawk.to Chat Widget */}
          <Script
            id="tawk-to"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/696630057e8d861989b31e89/1jerin644';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}