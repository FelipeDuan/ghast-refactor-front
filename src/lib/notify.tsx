import { CircleAlert, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type Base = { title?: string; description?: string };

type NotifyMessages<T = unknown> = {
  loading: React.ReactNode;
  success: React.ReactNode | ((data: T) => React.ReactNode);
  error: React.ReactNode | ((err: unknown) => React.ReactNode);
};

export const notify = {
  info: (o: Base) => {
    toast.info(o.title ?? 'Tudo certo', {
      description: o.description,
      icon: <Info className="size-5" />,
    });
  },

  success: (o: Base) => {
    toast.success(o.title ?? 'Ação concluída', {
      description: o.description,
      // icon: <CheckCircle2 className="size-5" />,
    });
  },

  warning: (o: Base) => {
    toast.warning(o.title ?? 'Atenção', {
      description: o.description,
      icon: <CircleAlert className="size-5" />,
    });
  },

  error: (o: Base) => {
    toast.error(o.title ?? 'Algo deu errado', {
      description: o.description,
      // icon: <XCircle className="size-5" />,
    });
  },

  async promise<T>(p: Promise<T>, msgs: NotifyMessages<T>): Promise<T> {
    toast.promise(p, msgs);
    return await p;
  },

  custom(opts: {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  }) {
    return toast.custom(t => (
      <div className="from-background/95 to-background/90 w-[340px] rounded-lg border border-white/10 bg-gradient-to-br p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <div className="flex items-start gap-3">
          {/* ícone */}
          <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <Info className="text-primary size-4" />
          </div>

          {/* conteúdo */}
          <div className="flex-1">
            <h4 className="text-foreground text-sm font-semibold tracking-tight">
              {opts.title}
            </h4>
            {opts.description && (
              <p className="text-muted-foreground mt-1 text-xs leading-snug">
                {opts.description}
              </p>
            )}

            {/* ação opcional */}
            {opts.actionLabel && (
              <Button
                variant={'link'}
                type="button"
                onClick={() => {
                  opts.onAction?.();
                  toast.dismiss(t);
                }}
                className="px-0 text-xs"
              >
                {opts.actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    ));
  },
};
