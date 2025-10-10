import {
  SidebarInset,
  SidebarProvider,
} from '@/components/animate-ui/components/radix/sidebar';
import { AppSidebar } from './app-sidebar';

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarLayoutProvider({ children }: SidebarProviderProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
