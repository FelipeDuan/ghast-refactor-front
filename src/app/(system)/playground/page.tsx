'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
// se quiser testar o social login (o seu):
import { SocialLogin } from '@/app/(auth)/_components/social-login';
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from '@/components/animate-ui/components/base/tabs';
// se quiser testar o toggle de tema:
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/layout/page-header';
import { notify } from '@/lib/notify';

const formSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlaygroundPage() {
  const [pending, startTransition] = useTransition();

  // --- FORM (react-hook-form + zod) ---
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(values: FormValues) {
    // simula requisição
    const req = new Promise(resolve => setTimeout(resolve, 1200));
    startTransition(async () => {
      await notify.promise(req, {
        loading: 'Enviando formulário…',
        success: 'Form enviado com sucesso!',
        error: 'Falha ao enviar.',
      });
      // faça algo com values se quiser
      console.log(values);
    });
  }

  // --- handlers para toasts e dropdown ---
  function handleSuccessToast() {
    notify.success({
      title: 'Tudo certo',
      description: 'Operação completada.',
    });
  }
  function handleInfoToast() {
    notify.info({ title: 'Informação', description: 'Mensagem informativa.' });
  }
  function handleWarningToast() {
    notify.warning({
      title: 'Atenção',
      description: 'Cheque os dados antes de prosseguir.',
    });
  }
  function handleErrorToast() {
    notify.error({
      title: 'Algo deu errado',
      description: 'Verifique sua conexão.',
    });
  }
  function handlePromiseToast() {
    const req = new Promise<string>(resolve =>
      setTimeout(() => resolve('ok'), 1500)
    );
    notify.promise(req, {
      loading: 'Processando…',
      success: 'Concluído!',
      error: 'Falha no processo.',
    });
  }

  return (
    <>
      <PageHeader
        breadcrumbItems={[
          { label: 'Início', href: '/dashboard', hiddenOnMobile: true },
          { label: 'Playground' },
        ]}
      />
      <div className="min-h-screen w-full p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">UI Playground</h1>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTab value="buttons">Botões</TabsTab>
            <TabsTab value="dropdown">Dropdown</TabsTab>
            <TabsTab value="form">Form</TabsTab>
            <TabsTab value="auth">Social Login</TabsTab>
          </TabsList>

          {/* --- BOTÕES & TOASTS --- */}
          <TabsPanels>
            <TabsPanel value="buttons">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons + Toaster</CardTitle>
                  <CardDescription>
                    Teste variações de botões e notificações.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={handleSuccessToast}>
                      <Check className="mr-2 size-4" />
                      Sucesso
                    </Button>
                    <Button variant="secondary" onClick={handleInfoToast}>
                      Info
                    </Button>
                    <Button variant="outline" onClick={handleWarningToast}>
                      Warning
                    </Button>
                    <Button variant="destructive" onClick={handleErrorToast}>
                      Erro
                    </Button>
                    <Button variant="ghost" onClick={handlePromiseToast}>
                      {pending ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Processando…
                        </>
                      ) : (
                        'Promise Toast'
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button disabled>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Loading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsPanel>

            {/* --- DROPDOWN --- */}
            <TabsPanel value="dropdown">
              <Card>
                <CardHeader>
                  <CardTitle>Dropdown Menu</CardTitle>
                  <CardDescription>
                    Teste do seu componente de dropdown.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        Ações <ChevronDown className="ml-2 size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-48">
                      <DropdownMenuItem onClick={handleInfoToast}>
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSuccessToast}>
                        Confirmar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleWarningToast}>
                        Aviso
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleErrorToast}>
                        Erro
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </TabsPanel>

            {/* --- FORM --- */}
            <TabsPanel value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Form (react-hook-form + zod)</CardTitle>
                  <CardDescription>
                    Formulário simples usando seus componentes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="grid gap-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="voce@exemplo.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Senha</FormLabel>
                              <Label className="text-muted-foreground text-xs">
                                Mín. 6 caracteres
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="••••••••"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3">
                        <Button type="submit" disabled={pending}>
                          {pending ? (
                            <>
                              <Loader2 className="mr-2 size-4 animate-spin" />
                              Enviando…
                            </>
                          ) : (
                            'Enviar'
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            form.reset({ email: '', password: '' })
                          }
                        >
                          Limpar
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsPanel>

            {/* --- SOCIAL LOGIN --- */}
            <TabsPanel value="auth">
              <Card>
                <CardHeader>
                  <CardTitle>Social Login</CardTitle>
                  <CardDescription>
                    Testando o seu componente de login social.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SocialLogin />
                  <div className="text-muted-foreground text-sm">
                    Dica: altere o `notify.promise` para retornar a promise
                    original e use `await` para controlar o redirect somente
                    quando der sucesso.
                  </div>
                </CardContent>
              </Card>
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </div>
    </>
  );
}
