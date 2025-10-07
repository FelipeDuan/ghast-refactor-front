// lib/navigation.ts
// Lógica para buscar e filtrar links de navegação baseado em permissões

import { commonNavigation, navigationByRole } from '@/layout/sidebar/nav-links';
import type {
  NavigationStructure,
  NavLink,
  NavSection,
  Tenant,
  User,
} from '@/types';

/**
 * Filtra um link baseado nas permissões do usuário e configurações do tenant
 */
function filterNavLink(link: NavLink, user: User, tenant: Tenant): boolean {
  // Verifica se o usuário tem o papel necessário
  const hasRequiredRole = link.requiredRoles.includes(user.role);
  if (!hasRequiredRole) return false;

  // Verifica se o tenant tem as funcionalidades necessárias habilitadas
  if (link.requiredFeatures) {
    const hasRequiredFeatures = link.requiredFeatures.every(feature => {
      return tenant.settings.features[
        feature as keyof typeof tenant.settings.features
      ];
    });
    if (!hasRequiredFeatures) return false;
  }

  return true;
}

/**
 * Filtra recursivamente os links de navegação, incluindo children
 */
function filterNavLinks(
  links: NavLink[],
  user: User,
  tenant: Tenant
): NavLink[] {
  return links
    .filter(link => filterNavLink(link, user, tenant))
    .map(link => ({
      ...link,
      children: link.children
        ? filterNavLinks(link.children, user, tenant)
        : undefined,
    }))
    .filter(link => !link.children || link.children.length > 0); // Remove links com children vazios
}

/**
 * Filtra uma seção de navegação baseada nas permissões
 */
function filterNavSection(
  section: NavSection,
  user: User,
  tenant: Tenant
): NavSection | null {
  // Verifica se o usuário tem permissão para ver a seção
  const hasRequiredRole = section.requiredRoles.includes(user.role);
  if (!hasRequiredRole) return null;

  // Filtra os links da seção
  const filteredLinks = filterNavLinks(section.links, user, tenant);

  // Se não há links visíveis, não mostra a seção
  if (filteredLinks.length === 0) return null;

  return {
    ...section,
    links: filteredLinks,
  };
}

/**
 * Busca a estrutura de navegação completa para um usuário específico
 * Esta função deve ser chamada em um Server Component
 */
export async function getNavigationStructure(
  user: User,
  tenant: Tenant
): Promise<NavigationStructure> {
  // Busca a navegação base para o papel do usuário
  const baseNavigation = navigationByRole[user.role] || [];

  // Filtra as seções baseado nas permissões e configurações do tenant
  const filteredSections = baseNavigation
    .map(section => filterNavSection(section, user, tenant))
    .filter((section): section is NavSection => section !== null);

  // Adiciona navegação comum (suporte, notificações, etc.)
  const commonSections = commonNavigation
    .map(section => filterNavSection(section, user, tenant))
    .filter((section): section is NavSection => section !== null);

  return {
    sections: [...filteredSections, ...commonSections],
  };
}

/**
 * Verifica se um caminho está ativo baseado na URL atual
 * Suporta correspondência exata e por prefixo
 */
export function isLinkActive(linkHref: string, currentPath: string): boolean {
  // Correspondência exata
  if (linkHref === currentPath) return true;

  // Correspondência por prefixo (para links com sub-rotas)
  // Evita marcar "/" como ativo para todas as rotas
  if (linkHref !== '/' && currentPath.startsWith(`${linkHref}/`)) return true;

  return false;
}

/**
 * Encontra o link ativo na estrutura de navegação
 * Útil para breadcrumbs e indicadores visuais
 */
export function findActiveLink(
  navigation: NavigationStructure,
  currentPath: string
): NavLink | null {
  for (const section of navigation.sections) {
    for (const link of section.links) {
      if (isLinkActive(link.href, currentPath)) {
        return link;
      }

      // Verifica children recursivamente
      if (link.children) {
        for (const child of link.children) {
          if (isLinkActive(child.href, currentPath)) {
            return child;
          }
        }
      }
    }
  }

  return null;
}

/**
 * Gera breadcrumbs baseado no link ativo
 */
export function generateBreadcrumbs(
  navigation: NavigationStructure,
  currentPath: string
): Array<{ label: string; href: string }> {
  const breadcrumbs: Array<{ label: string; href: string }> = [];

  for (const section of navigation.sections) {
    for (const link of section.links) {
      if (isLinkActive(link.href, currentPath)) {
        breadcrumbs.push({ label: link.label, href: link.href });
        return breadcrumbs;
      }

      // Verifica children
      if (link.children) {
        for (const child of link.children) {
          if (isLinkActive(child.href, currentPath)) {
            breadcrumbs.push({ label: link.label, href: link.href });
            breadcrumbs.push({ label: child.label, href: child.href });
            return breadcrumbs;
          }
        }
      }
    }
  }

  return breadcrumbs;
}
