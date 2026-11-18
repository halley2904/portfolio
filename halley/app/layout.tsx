import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import Intro from '../components/Intro';
import SmoothScroll from '../components/SmoothScroll';
import { site } from '../content/site';

const title = 'Halley Patel | AI Product Builder';
const description = 'AI Product Builder helping founders define MVPs, design AI workflows and create testable low-code prototypes.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s | Halley Patel' },
  description,
  keywords: ['AI Product Builder', 'AI MVP Scoping', 'AI Workflow Design', 'Low-code Prototyping', 'Product Discovery', 'Halley Patel'],
  authors: [{ name: 'Halley Patel' }],
  openGraph: { type: 'website', url: '/', siteName: 'Halley Patel', title, description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Halley Patel, AI Product Builder' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#121512' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
        <Intro />
        <SmoothScroll />
        <Nav />
        <Reveal />
        <main id="main" className="overflow-x-clip">{children}</main>
      </body>
    </html>
  );
}
