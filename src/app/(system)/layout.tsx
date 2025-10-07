// src/app/(system)/layout.tsx
import { SidebarLayout } from '@/layout/sidebar/sidebar-layout';

export default function SystemLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
