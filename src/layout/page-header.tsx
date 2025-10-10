import { Fragment } from 'react';
import { SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

interface BreadcrumbItemType {
  label: string;
  href?: string;
  hiddenOnMobile?: boolean;
}

interface PageHeaderProps {
  breadcrumbItems: BreadcrumbItemType[];
}

export function PageHeader({ breadcrumbItems }: PageHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const className = item.hiddenOnMobile ? 'hidden md:block' : '';

            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: < explanation>
              <Fragment key={index}>
                <BreadcrumbItem className={className}>
                  {item.href && !isLast ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className={className} />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
