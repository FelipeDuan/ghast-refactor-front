// src/components/client-sidebar-wrapper.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface ClientSidebarWrapperProps {
  children: React.ReactNode;
}

export function ClientSidebarWrapper({ children }: ClientSidebarWrapperProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '280px',
          '--sidebar-width-mobile': '280px',
        } as React.CSSProperties
      }
    >
      {children}
    </SidebarProvider>
  );
}

// Componente separado para o trigger (precisa estar dentro do SidebarProvider)
export function SidebarTriggerWithSeparator() {
  return (
    <>
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
    </>
  );
}
