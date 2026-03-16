import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { FormspreeProvider } from '../components/providers/FormspreeProvider';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import ClientThemeBackground from '../components/ClientThemeBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://intrinsiclabs.co'),
  title: 'Intrinsic Labs | Mobile & Web Development Studio',
  description:
    'We build exceptional digital experiences that solve real problems, from native mobile apps to full-stack web applications.',
  keywords: ['mobile development', 'web development', 'iOS', 'Android', 'Swift', 'Kotlin', 'React', 'Next.js'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/jetbrains_mono/JetBrainsMono-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/times_new_roman/Times New Roman.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <ThemeProvider>
        <ClientThemeBackground>
          <Navigation />
          <FormspreeProvider>
            <main className="flex-grow">{children}</main>
          </FormspreeProvider>
          <Footer />
          <Analytics />
        </ClientThemeBackground>
      </ThemeProvider>
    </html>
  );
}
