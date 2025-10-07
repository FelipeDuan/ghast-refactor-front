// /layout/sidebar/nav-links.ts
// Configuração centralizada dos links de navegação por papel de usuário

import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  FolderOpen,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react';

import type { NavSection, UserRole } from '@/types';

/**
 * Estrutura de navegação para Super Admin
 * Acesso completo a gestão de tenants e métricas globais
 */
const superAdminNavigation: NavSection[] = [
  {
    id: 'platform',
    label: 'Plataforma',
    requiredRoles: ['SUPER_ADMIN'],
    links: [
      {
        id: 'global-dashboard',
        label: 'Dashboard Global',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        requiredRoles: ['SUPER_ADMIN'],
      },
      {
        id: 'tenants',
        label: 'Gestão de Tenants',
        href: '/admin/tenants',
        icon: Globe,
        requiredRoles: ['SUPER_ADMIN'],
      },
      {
        id: 'platform-metrics',
        label: 'Métricas da Plataforma',
        href: '/admin/metrics',
        icon: BarChart3,
        requiredRoles: ['SUPER_ADMIN'],
      },
    ],
  },
];

/**
 * Estrutura de navegação para Admin do Tenant
 * Gestão completa do tenant específico
 */
const tenantAdminNavigation: NavSection[] = [
  {
    id: 'overview',
    label: 'Visão Geral',
    requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
    links: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
    ],
  },
  {
    id: 'management',
    label: 'Gestão',
    requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
    links: [
      {
        id: 'users',
        label: 'Usuários',
        href: '/users',
        icon: Users,
        requiredRoles: ['TENANT_ADMIN'],
      },
      {
        id: 'clients',
        label: 'Clientes',
        href: '/clients',
        icon: UserCheck,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
      {
        id: 'companies',
        label: 'Empresas',
        href: '/companies',
        icon: Building2,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
      {
        id: 'projects',
        label: 'Projetos',
        href: '/projects',
        icon: FolderOpen,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
    ],
  },
  {
    id: 'business',
    label: 'Negócio',
    requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
    links: [
      {
        id: 'reports',
        label: 'Relatórios',
        href: '/reports',
        icon: FileText,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
        requiredFeatures: ['advancedReports'],
      },
      {
        id: 'billing',
        label: 'Faturamento',
        href: '/billing',
        icon: CreditCard,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        requiredRoles: ['TENANT_ADMIN', 'MANAGER'],
      },
    ],
  },
  {
    id: 'configuration',
    label: 'Configuração',
    requiredRoles: ['TENANT_ADMIN'],
    links: [
      {
        id: 'tenant-settings',
        label: 'Configurações do Tenant',
        href: '/settings/tenant',
        icon: Settings,
        requiredRoles: ['TENANT_ADMIN'],
      },
      {
        id: 'integrations',
        label: 'Integrações',
        href: '/settings/integrations',
        icon: Shield,
        requiredRoles: ['TENANT_ADMIN'],
        requiredFeatures: ['integrations'],
      },
    ],
  },
];

/**
 * Estrutura de navegação para Consultor
 * Acesso limitado aos próprios projetos e tarefas
 */
const consultantNavigation: NavSection[] = [
  {
    id: 'work',
    label: 'Meu Trabalho',
    requiredRoles: ['CONSULTANT'],
    links: [
      {
        id: 'my-dashboard',
        label: 'Meu Dashboard',
        href: '/consultant/dashboard',
        icon: LayoutDashboard,
        requiredRoles: ['CONSULTANT'],
      },
      {
        id: 'my-projects',
        label: 'Meus Projetos',
        href: '/consultant/projects',
        icon: FolderOpen,
        requiredRoles: ['CONSULTANT'],
      },
      {
        id: 'calendar',
        label: 'Agenda',
        href: '/consultant/calendar',
        icon: Calendar,
        requiredRoles: ['CONSULTANT'],
      },
      {
        id: 'messages',
        label: 'Mensagens',
        href: '/consultant/messages',
        icon: MessageSquare,
        requiredRoles: ['CONSULTANT'],
      },
    ],
  },
];

/**
 * Estrutura de navegação para Cliente
 * Portal do cliente com acesso aos próprios projetos
 */
const clientNavigation: NavSection[] = [
  {
    id: 'client-portal',
    label: 'Portal do Cliente',
    requiredRoles: ['CLIENT'],
    links: [
      {
        id: 'client-dashboard',
        label: 'Meu Dashboard',
        href: '/client/dashboard',
        icon: LayoutDashboard,
        requiredRoles: ['CLIENT'],
      },
      {
        id: 'my-projects',
        label: 'Meus Projetos',
        href: '/client/projects',
        icon: FolderOpen,
        requiredRoles: ['CLIENT'],
      },
      {
        id: 'documents',
        label: 'Documentos',
        href: '/client/documents',
        icon: FileText,
        requiredRoles: ['CLIENT'],
      },
      {
        id: 'invoices',
        label: 'Faturas',
        href: '/client/invoices',
        icon: CreditCard,
        requiredRoles: ['CLIENT'],
      },
    ],
  },
];

/**
 * Mapeamento de navegação por papel de usuário
 */
export const navigationByRole: Record<UserRole, NavSection[]> = {
  SUPER_ADMIN: superAdminNavigation,
  TENANT_ADMIN: tenantAdminNavigation,
  MANAGER: tenantAdminNavigation, // Managers usam a mesma estrutura, mas com links filtrados
  CONSULTANT: consultantNavigation,
  CLIENT: clientNavigation,
};

/**
 * Links de suporte e configurações pessoais (disponíveis para todos)
 */
export const commonNavigation: NavSection[] = [
  {
    id: 'support',
    label: 'Suporte',
    requiredRoles: [
      'SUPER_ADMIN',
      'TENANT_ADMIN',
      'MANAGER',
      'CONSULTANT',
      'CLIENT',
    ],
    links: [
      {
        id: 'notifications',
        label: 'Notificações',
        href: '/notifications',
        icon: Bell,
        requiredRoles: [
          'SUPER_ADMIN',
          'TENANT_ADMIN',
          'MANAGER',
          'CONSULTANT',
          'CLIENT',
        ],
      },
      {
        id: 'help',
        label: 'Ajuda',
        href: '/help',
        icon: MessageSquare,
        requiredRoles: [
          'SUPER_ADMIN',
          'TENANT_ADMIN',
          'MANAGER',
          'CONSULTANT',
          'CLIENT',
        ],
      },
    ],
  },
];
