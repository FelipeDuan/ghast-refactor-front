import { ChevronsUpDown } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/animate-ui/components/radix/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DropdownUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={'lg'}
              className="group data-[state=open]:bg-accent data-[state=open]:text-accent-foreground dark:data-[state=open]:bg-accent/50 cursor-pointer transition"
            >
              <Avatar className="h-8 w-8 rounded-sm">
                <AvatarImage
                  src={`https://avatars.githubusercontent.com/u/161091633?v=4`}
                  alt="Imagem de Felipe Duan"
                  className="rounded-md"
                />
                <AvatarFallback className="rounded-sm">FD</AvatarFallback>
                <AvatarIndicator className="-end-2.5 -bottom-2">
                  <AvatarStatus variant="online" className="size-3" />
                </AvatarIndicator>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Felipe Duan</span>
                <span className="truncate text-xs">felipeduan1@gmail.com</span>
              </div>
              <ChevronsUpDown className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem className="cursor-pointer">
              <span>Ghast Consutancy</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <span>CodeSpace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
