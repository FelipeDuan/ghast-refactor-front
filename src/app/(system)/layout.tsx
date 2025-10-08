import { SidebarLayoutProvider } from '@/layout/sidebar-provider';

export default function SystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarLayoutProvider>{children}</SidebarLayoutProvider>;
}
