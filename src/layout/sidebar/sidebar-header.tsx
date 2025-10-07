// /layout/sidebar/sidebar-header.tsx
// Cabeçalho da sidebar com logo e informações do tenant (Server Component)

import { Building2 } from 'lucide-react';
import Image from 'next/image';
import type { Tenant } from '@/types';

interface SidebarHeaderProps {
  tenant: Tenant;
}

/**
 * Componente de cabeçalho da sidebar
 * Server Component que renderiza o logo e nome do tenant
 */
export function SidebarHeaderComponent({ tenant }: SidebarHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Logo do tenant ou ícone padrão */}
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
        {tenant.branding.logo ? (
          <Image
            src={tenant.branding.logo}
            alt={`${tenant.name} logo`}
            width={32}
            height={32}
            className="rounded-lg object-cover"
          />
        ) : (
          <Building2
            className="text-primary-foreground h-4 w-4"
            aria-label={`${tenant.name} logo`}
          />
        )}
      </div>

      {/* Informações do tenant */}
      <div className="flex flex-col">
        <span
          className="text-foreground max-w-[160px] truncate text-sm font-semibold"
          title={tenant.name}
        >
          {tenant.name}
        </span>
        <span className="text-muted-foreground text-xs">Enterprise</span>
      </div>
    </div>
  );
}

/**
 * Variante compacta do cabeçalho para sidebars colapsadas
 */
export function SidebarHeaderCompact({ tenant }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-center px-4 py-3">
      <div
        className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg"
        title={tenant.name}
      >
        {tenant.branding.logo ? (
          <Image
            src={tenant.branding.logo}
            alt={`${tenant.name} logo`}
            width={32}
            height={32}
            className="rounded-lg object-cover"
          />
        ) : (
          <Building2
            className="text-primary-foreground h-4 w-4"
            aria-label={`${tenant.name} logo`}
          />
        )}
      </div>
    </div>
  );
}
