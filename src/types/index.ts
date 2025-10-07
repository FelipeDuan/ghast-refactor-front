// types/index.ts
// Tipos globais para o sistema GHAST multi-tenant

import type { LucideIcon } from 'lucide-react';

/**
 * Representa um tenant no sistema multi-tenant
 */
export interface Tenant {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
  branding: TenantBranding;
  settings: TenantSettings;
}

/**
 * Configurações de branding específicas do tenant
 */
export interface TenantBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily?: string;
}

/**
 * Configurações funcionais do tenant
 */
export interface TenantSettings {
  features: {
    vipClients: boolean;
    advancedReports: boolean;
    projectTemplates: boolean;
    integrations: boolean;
  };
  limits: {
    maxUsers: number;
    maxProjects: number;
    storageGB: number;
  };
}

/**
 * Papéis de usuário no sistema
 */
export type UserRole =
  | 'SUPER_ADMIN'
  | 'TENANT_ADMIN'
  | 'MANAGER'
  | 'CONSULTANT'
  | 'CLIENT';

/**
 * Representa um usuário no sistema
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string;
  avatar?: string;
  isActive: boolean;
}

/**
 * Representa um item de navegação
 */
export interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  requiredRoles: UserRole[];
  requiredFeatures?: string[];
  children?: NavLink[];
}

/**
 * Seção de navegação (agrupamento de links)
 */
export interface NavSection {
  id: string;
  label: string;
  links: NavLink[];
  requiredRoles: UserRole[];
}

/**
 * Estrutura completa de navegação
 */
export interface NavigationStructure {
  sections: NavSection[];
}

/**
 * Contexto da sessão do usuário
 */
export interface SessionContext {
  user: User | null;
  tenant: Tenant | null;
  isLoading: boolean;
}

/**
 * Props para componentes de navegação
 */
export interface NavigationProps {
  navigation: NavigationStructure;
  currentPath: string;
  user: User;
  tenant: Tenant;
}

/**
 * Estado da sidebar (para mobile)
 */
export interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
}
