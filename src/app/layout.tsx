import type { Metadata } from 'next';
import { Platypi } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '../react-query';
import { Suspense } from 'react';

const platypi = Platypi({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GeoGle',
  description: 'For Theory of Computation',
  icons: './favicon.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${platypi.className} antialiased`}>
        <ReactQueryProvider>
          <Suspense>{children}</Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
