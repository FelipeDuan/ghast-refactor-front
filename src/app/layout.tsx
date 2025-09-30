import type { Metadata } from 'next';
import './globals.css';
import { Figtree } from 'next/font/google';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Ghast Consultancy',
  description: 'Frontend refatorado da Ghast, feito por Felipe Duan',
};

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-figtree',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${figtree.variable}`}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
