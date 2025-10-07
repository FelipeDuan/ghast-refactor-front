// src/components/system-layout.tsx (SEM 'use client')
import { Suspense } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AppSidebar, SidebarSkeleton } from '@/layout/sidebar/sidebar';
import {
  ClientSidebarWrapper,
  SidebarTriggerWithSeparator,
} from './client-sidebar-wrapper';

interface SystemLayoutProps {
  children: React.ReactNode;
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  return (
    <ClientSidebarWrapper>
      {/* Sidebar (Server Component) */}
      <Suspense fallback={<SidebarSkeleton />}>
        <AppSidebar />
      </Suspense>

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col">
        {/* Header com breadcrumbs */}
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
          <SidebarTriggerWithSeparator />

          {/* Breadcrumbs dinâmicos */}
          <Suspense fallback={<BreadcrumbSkeleton />}>
            <DynamicBreadcrumbs />
          </Suspense>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </ClientSidebarWrapper>
  );
}

// Componentes auxiliares (Server Components)
async function DynamicBreadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>Página Atual</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-muted h-4 w-20 animate-pulse rounded" />
      <div className="bg-muted h-4 w-1 animate-pulse rounded" />
      <div className="bg-muted h-4 w-24 animate-pulse rounded" />
    </div>
  );
}
