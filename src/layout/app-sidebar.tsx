import { Activity, Bell, Folder, LayoutDashboard, Play } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarButton } from '@/components/ui/sidebar-button';

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
    url: '#',
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
      <SidebarHeader>Header</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Painel Principal</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
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
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}
