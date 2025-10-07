'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export function SidebarButton({ children, href }: SidebarButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === `${href}` ? 'default' : 'ghost'}
      className="w-full justify-start gap-2"
      asChild
    >
      <Link href={href ?? '#'}>{children}</Link>
    </Button>
  );
}
