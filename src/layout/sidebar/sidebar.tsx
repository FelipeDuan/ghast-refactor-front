// /layout/sidebar/sidebar.tsx
// Componente principal da sidebar (Server Component)
// Responsável por buscar dados e coordenar os componentes filhos

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { getCurrentTenant, getCurrentUser } from '@/lib/auth';
import { getNavigationStructure } from '@/lib/navigation';
import { SidebarHeaderComponent } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';
import { UserDropdown } from './user-dropdown';

/**
 * Componente principal da sidebar
 * Este é um Server Component que busca os dados necessários e os passa para os componentes filhos
 */
export async function AppSidebar() {
  // Busca dados do usuário e tenant no servidor
  // Estas funções devem ser implementadas na lib/auth.ts
  const user = await getCurrentUser();
  const tenant = await getCurrentTenant();

  // Se não há usuário ou tenant, não renderiza a sidebar
  if (!user || !tenant) {
    return null;
  }

  // Busca a estrutura de navegação filtrada para este usuário/tenant
  const navigation = await getNavigationStructure(user, tenant);

  return (
    <Sidebar variant="inset" className="border-border/50 border-r">
      {/* Cabeçalho com logo e nome do tenant */}
      <SidebarHeader className="border-border/50 border-b">
        <SidebarHeaderComponent tenant={tenant} />
      </SidebarHeader>

      {/* Conteúdo principal com navegação */}
      <SidebarContent className="px-2 py-4">
        {/* 
          SidebarNav é um Client Component que usa usePathname 
          para determinar qual link está ativo 
        */}
        <SidebarNav navigation={navigation} user={user} tenant={tenant} />
      </SidebarContent>

      {/* Rodapé com informações do usuário */}
      <SidebarFooter className="border-border/50 border-t p-4">
        {/* 
          UserDropdown é um Client Component para interatividade 
        */}
        <UserDropdown user={user} tenant={tenant} />
      </SidebarFooter>
    </Sidebar>
  );
}

/**
 * Componente de fallback para quando a sidebar está carregando
 * Útil para Suspense boundaries
 */
export function SidebarSkeleton() {
  return (
    <Sidebar variant="inset" className="border-border/50 border-r">
      <SidebarHeader className="border-border/50 border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-8 w-8 animate-pulse rounded-lg" />
          <div className="space-y-2">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="bg-muted h-3 w-16 animate-pulse rounded" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-4 px-2 py-4">
        {/* Skeleton para seções de navegação */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-muted mx-2 h-4 w-20 animate-pulse rounded" />
            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="bg-muted mx-2 h-8 animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-border/50 border-t p-4">
        <div className="flex items-center gap-3">
          <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="bg-muted h-4 w-24 animate-pulse rounded" />
            <div className="bg-muted h-3 w-32 animate-pulse rounded" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
