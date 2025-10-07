// /layout/sidebar/user-dropdown.tsx
// Dropdown com informações e ações do usuário (Client Component)

'use client';

import {
  Bell,
  ChevronUp,
  HelpCircle,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Tenant, User } from '@/types';

interface UserDropdownProps {
  user: User;
  tenant: Tenant;
}

/**
 * Componente de dropdown do usuário
 * Client Component para gerenciar estado de abertura/fechamento
 */
export function UserDropdown({ user, tenant }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Função para fazer logout (deve ser implementada)
  const handleLogout = async () => {
    // Implementar lógica de logout
    console.log('Logout clicked');
  };

  // Obter iniciais do nome do usuário
  const userInitials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Mapear papel do usuário para label amigável
  const roleLabels = {
    SUPER_ADMIN: 'Super Admin',
    TENANT_ADMIN: 'Administrador',
    MANAGER: 'Gerente',
    CONSULTANT: 'Consultor',
    CLIENT: 'Cliente',
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent h-auto w-full justify-start gap-3 px-2 py-2"
        >
          {/* Avatar do usuário */}
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs font-medium">
              {userInitials}
            </AvatarFallback>
          </Avatar>

          {/* Informações do usuário */}
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <span className="max-w-[140px] truncate text-sm font-medium">
              {user.name}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-1 py-0 text-xs">
                {roleLabels[user.role]}
              </Badge>
            </div>
          </div>

          {/* Ícone de expansão */}
          <ChevronUp
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" side="top">
        {/* Informações do usuário */}
        <DropdownMenuLabel className="pb-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="outline" className="text-xs">
                {roleLabels[user.role]}
              </Badge>
              <span className="text-muted-foreground text-xs">
                • {tenant.name}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Ações do usuário */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/notifications" className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notificações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/help" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Ajuda</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Versão compacta do dropdown para sidebar colapsada
 */
export function UserDropdownCompact({ user }: Pick<UserDropdownProps, 'user'>) {
  const userInitials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          title={user.name}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Meu Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
