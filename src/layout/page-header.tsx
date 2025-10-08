import { ModeToggle } from '@/components/theming/mode-toogle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function PageHeader() {
  return (
    <>
      <header className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center justify-start gap-6">
          <SidebarTrigger />
          <div className="bg-border h-8 w-px" />
          Dashboard
        </div>
        <ModeToggle />
      </header>
      <Separator />
    </>
  );
}
