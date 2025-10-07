// src/components/sidebar-layout.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// Importa apenas os componentes que NÃO usam next/headers
interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '280px',
          '--sidebar-width-mobile': '280px',
        } as React.CSSProperties
      }
    >
      {/* Sidebar estática por enquanto - você pode adicionar depois */}
      <div className="bg-sidebar w-[280px] border-r">
        <div className="p-4">
          <h2>Sidebar</h2>
          {/* Adicione seus links aqui manualmente por enquanto */}
        </div>
      </div>

      <SidebarInset>
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div>Breadcrumbs</div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
