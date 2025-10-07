// lib/auth.ts
// Funções de autenticação e busca de dados do usuário/tenant
// Estas são funções de exemplo - devem ser adaptadas para sua implementação específica

import { headers } from 'next/headers';
import type { Tenant, User } from '@/types';

/**
 * Busca o usuário atual da sessão
 * Esta função deve ser implementada de acordo com sua estratégia de autenticação
 * (NextAuth, Auth0, JWT, etc.)
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    // Exemplo usando headers para buscar token JWT
    const headersList = await headers();
    const authorization = headersList.get('authorization');

    if (!authorization) {
      return null;
    }

    // Aqui você faria a validação do token e busca do usuário
    // Este é apenas um exemplo - substitua pela sua implementação

    // Simulação de dados do usuário
    const mockUser: User = {
      id: 'user-123',
      email: 'admin@empresa.com',
      name: 'João Silva',
      role: 'TENANT_ADMIN',
      tenantId: 'tenant-456',
      avatar: '/avatars/joao-silva.jpg',
      isActive: true,
    };

    return mockUser;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
}

/**
 * Busca o tenant atual baseado no subdomínio ou contexto
 */
export async function getCurrentTenant(): Promise<Tenant | null> {
  try {
    const headersList = await headers();
    const host = headersList.get('host');

    if (!host) {
      return null;
    }

    // Extrai o subdomínio (ex: empresa1.ghast.com -> empresa1)
    const subdomain = extractSubdomain(host);

    if (!subdomain) {
      return null;
    }

    // Busca o tenant pelo slug/subdomain
    // Substitua pela sua implementação de banco de dados
    const tenant = await getTenantBySlug(subdomain);

    return tenant;
  } catch (error) {
    console.error('Erro ao buscar tenant atual:', error);
    return null;
  }
}

/**
 * Extrai o subdomínio de uma URL
 */
function extractSubdomain(host: string): string | null {
  // Remove porta se existir
  const hostname = host.split(':')[0];

  // Divide por pontos
  const parts = hostname.split('.');

  // Se tem pelo menos 3 partes (ex: empresa1.ghast.com), o primeiro é o subdomain
  if (parts.length >= 3) {
    return parts[0];
  }

  // Para desenvolvimento local, pode usar um header customizado
  return null;
}

/**
 * Busca tenant pelo slug
 * Esta função deve ser implementada com sua estratégia de banco de dados
 */
async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  try {
    // Simulação de busca no banco de dados
    // Substitua pela sua implementação (Prisma, Drizzle, etc.)

    const mockTenant: Tenant = {
      id: 'tenant-456',
      slug: slug,
      name: 'Empresa Exemplo Ltda',
      isActive: true,
      branding: {
        logo: '/logos/empresa-exemplo.png',
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af',
        accentColor: '#f59e0b',
        fontFamily: 'Inter',
      },
      settings: {
        features: {
          vipClients: true,
          advancedReports: true,
          projectTemplates: true,
          integrations: false,
        },
        limits: {
          maxUsers: 50,
          maxProjects: 100,
          storageGB: 10,
        },
      },
    };

    return mockTenant;
  } catch (error) {
    console.error('Erro ao buscar tenant:', error);
    return null;
  }
}

/**
 * Verifica se o usuário tem permissão para acessar um recurso
 */
export function hasPermission(
  user: User,
  requiredRoles: string[],
  tenant?: Tenant
): boolean {
  // Verifica se o usuário tem um dos papéis necessários
  const hasRole = requiredRoles.includes(user.role);

  // Verifica se o usuário está ativo
  const isActive = user.isActive;

  // Verifica se o tenant está ativo (se fornecido)
  const tenantActive = !tenant || tenant.isActive;

  return hasRole && isActive && tenantActive;
}

/**
 * Middleware para verificar autenticação em Server Components
 */
export async function requireAuth(): Promise<{ user: User; tenant: Tenant }> {
  const user = await getCurrentUser();
  const tenant = await getCurrentTenant();

  if (!user || !tenant) {
    // throw new Error('Usuário não autenticado ou tenant não encontrado');

    const mockUser: User = {
      id: '123',
      email: 'felipeduan1@gmail.com',
      name: 'Felipe Duan',
      role: 'SUPER_ADMIN',
      tenantId: '321',
      isActive: true,
      // avatar: "/avatars/felipe.png",
    };

    const mockTenant: Tenant = {
      id: '4124',
      slug: 'codespace-tenant',
      name: 'CodeSpace',
      isActive: true,
      branding: {
        logo: '/logo/codespace.svg',
        primaryColor: '#4F46E5', // indigo-600
        secondaryColor: '#0EA5E9', // sky-500
        accentColor: '#22C55E', // green-500
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      settings: {
        features: {
          vipClients: true,
          advancedReports: true,
          projectTemplates: true,
          integrations: true,
        },
        limits: {
          maxUsers: 50,
          maxProjects: 200,
          storageGB: 100,
        },
      },
    };

    return { user: mockUser, tenant: mockTenant };
  }

  return { user, tenant };
}
