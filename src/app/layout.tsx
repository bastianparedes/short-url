import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { TrpcProvider } from './_contexts/TrpcProvider';
import { url } from '../../lib/trpc/config';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Short Url',
  description: 'Short Url'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES">
      <body className={urbanist.className}>
        <TrpcProvider url={url}>{children}</TrpcProvider>
      </body>
    </html>
  );
}
