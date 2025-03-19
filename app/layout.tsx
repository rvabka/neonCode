import type { Metadata } from 'next';
import './globals.css';
import 'easymde/dist/easymde.min.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'neonCode',
  description: 'neonCode - blog about programming and web development',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        {children} <Toaster />
      </body>
    </html>
  );
}
