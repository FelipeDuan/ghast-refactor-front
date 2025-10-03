// src/components/dev/ToastLab.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notify';

export default function ToastLab() {
  return (
    <div className="mx-auto mt-6 w-full max-w-xl space-y-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <Header />
      <BasicToasts />
      <PromiseToasts />
      <CustomToastDemo />
    </div>
  );
}

function Header() {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-semibold">Toast Lab</h2>
      <p className="text-foreground/70 text-sm">
        Clique para disparar cada variação do <code>notify</code>.
      </p>
    </div>
  );
}

function BasicToasts() {
  return (
    <section className="space-y-3">
      <h3 className="text-foreground/80 text-sm font-medium">Básicos</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button
          variant="outline"
          onClick={() =>
            notify.info({
              title: 'Tudo certo',
              description: 'Mensagem informativa padrão.',
            })
          }
        >
          info
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            notify.success({
              title: 'Ação concluída',
              description: 'Seu login foi realizado.',
            })
          }
        >
          success
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            notify.warning({
              title: 'Atenção',
              description: 'Algo pode precisar da sua ação.',
            })
          }
        >
          warning
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            notify.error({
              title: 'Erro',
              description: 'Não foi possível concluir a ação.',
            })
          }
        >
          error
        </Button>
      </div>
    </section>
  );
}

function PromiseToasts() {
  async function resolveAfter(ms: number) {
    await new Promise(r => setTimeout(r, ms));
    return { ok: true };
  }
  async function rejectAfter(ms: number) {
    await new Promise(r => setTimeout(r, ms));
    throw new Error('Falhou no servidor');
  }

  return (
    <section className="space-y-3">
      <h3 className="text-foreground/80 text-sm font-medium">Promise</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          onClick={() =>
            notify.promise(resolveAfter(1200), {
              loading: 'Processando…',
              success: 'Concluído com sucesso!',
              error: 'Ops! Algo deu errado.',
            })
          }
        >
          Promise (resolve)
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            notify.promise(rejectAfter(1200), {
              loading: 'Enviando dados…',
              success: 'Tudo certo!',
              error: 'Falha ao enviar dados.',
            })
          }
        >
          Promise (reject)
        </Button>
      </div>
    </section>
  );
}

function CustomToastDemo() {
  const [title, setTitle] = useState('Conta criada com sucesso');
  const [description, setDescription] = useState(
    'Ative a verificação em duas etapas para mais segurança.'
  );
  const [actionLabel, setActionLabel] = useState('Ativar agora');

  return (
    <section className="space-y-3">
      <h3 className="text-foreground/80 text-sm font-medium">Custom</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label>Título</Label>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label className="text-foreground/60 text-xs">Descrição</Label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label className="text-foreground/60 text-xs">Rótulo da ação</Label>
          <Input
            value={actionLabel}
            onChange={e => setActionLabel(e.target.value)}
            placeholder="(opcional)"
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              notify.custom({
                title,
                description,
                actionLabel: actionLabel || undefined,
                onAction: () => alert('CTA clicado'),
              })
            }
          >
            Disparar custom
          </Button>
        </div>
      </div>
    </section>
  );
}
