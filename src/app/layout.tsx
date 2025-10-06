import type { Metadata } from 'next';
import './globals.css';
import { Figtree, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Ghast Consultancy',
  description: 'Frontend refatorado da Ghast, feito por Felipe Duan',
};

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-figtree',
});
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${figtree.variable} ${plusJakartaSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Toaster position="top-center" richColors closeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
