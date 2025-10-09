import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface PageHeaderProps {
  pageName: string;
}

export function PageHeader({ pageName }: PageHeaderProps) {
  return (
    <>
      <header className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center justify-start gap-6 font-medium">
          <SidebarTrigger />
          <div className="bg-border h-8 w-px" />
          {pageName}
        </div>
      </header>
      <Separator />
    </>
  );
}
