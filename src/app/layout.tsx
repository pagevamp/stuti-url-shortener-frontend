import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const primary = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const secondary = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'URL Shortener Frontend',
  description: 'Created the frontend for the URL Shortener Project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primary.variable} ${secondary.variable} antialiased [&:has([data-modal=true])]:overflow-hidden `}
      >
        {children}
      </body>
    </html>
  );
}
