import { Activity, Bell, Folder, LayoutDashboard, Play } from 'lucide-react';
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/animate-ui/components/radix/sidebar';
import { SidebarButton } from '@/components/ui/sidebar-button';
import { DropdownUser } from './dropdown-user';
import { GhastLogo } from './ghast-logo';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'UI Playground',
    url: '/playground',
    icon: Play,
  },
  {
    title: 'Notificações',
    url: '/notificacoes',
    icon: Bell,
  },
  {
    title: 'Atividades',
    url: '#',
    icon: Activity,
  },
  {
    title: 'Relatórios',
    url: '#',
    icon: Folder,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <GhastLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Painel Principal</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu className="gap-1.5 p-1">
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarButton href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeTogglerButton />
        <DropdownUser />
      </SidebarFooter>
    </Sidebar>
  );
}
