// /layout/sidebar/sidebar-nav.tsx
// Componente de navegação da sidebar (Client Component)
// Usa usePathname para determinar o link ativo

'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { isLinkActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { NavigationStructure, NavLink, Tenant, User } from '@/types';

interface SidebarNavProps {
  navigation: NavigationStructure;
  user: User;
  tenant: Tenant;
}

/**
 * Componente de navegação principal da sidebar
 * Client Component que usa usePathname para estado ativo
 */
export function SidebarNav({ navigation }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      {navigation.sections.map(section => (
        <SidebarGroup key={section.id}>
          <SidebarGroupLabel className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            {section.label}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {section.links.map(link => (
                <NavLinkItem key={link.id} link={link} currentPath={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </div>
  );
}

/**
 * Componente individual de link de navegação
 * Suporta links com e sem children (submenus)
 */
interface NavLinkItemProps {
  link: NavLink;
  currentPath: string;
}

function NavLinkItem({ link, currentPath }: NavLinkItemProps) {
  const isActive = isLinkActive(link.href, currentPath);
  const hasChildren = link.children && link.children.length > 0;

  // Se tem children, renderiza como collapsible
  if (hasChildren) {
    return (
      <Collapsible asChild defaultOpen={isActive}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={cn(
                'w-full justify-between',
                isActive && 'bg-accent text-accent-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
                {link.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {link.badge}
                  </Badge>
                )}
              </div>
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {link.children?.map(child => (
                <SidebarMenuSubItem key={child.id}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isLinkActive(child.href, currentPath)}
                  >
                    <Link href={child.href}>
                      <child.icon className="h-4 w-4" />
                      <span>{child.label}</span>
                      {child.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {child.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  // Link simples sem children
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="w-full justify-start"
      >
        <Link href={link.href}>
          <link.icon className="h-4 w-4" />
          <span>{link.label}</span>
          {link.badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {link.badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/**
 * Componente de navegação compacta para sidebar colapsada
 */
export function SidebarNavCompact({ navigation }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {navigation.sections.map(section => (
        <div key={section.id} className="space-y-1">
          {section.links.map(link => {
            const isActive = isLinkActive(link.href, pathname);

            return (
              <SidebarMenuButton
                key={link.id}
                asChild
                isActive={isActive}
                size="sm"
                className="w-full justify-center px-2"
                title={link.label}
              >
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </div>
      ))}
    </div>
  );
}
