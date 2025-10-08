import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarLayoutProvider({ children }: SidebarProviderProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
