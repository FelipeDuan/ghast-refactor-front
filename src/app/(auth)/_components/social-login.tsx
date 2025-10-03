'use client';

import { useRouter } from 'next/navigation';
import { AppleSvg } from '@/components/svg/apple';
import { GoogleSvg } from '@/components/svg/google-svg';
import { Button } from '@/components/ui/button';
import { notify } from '@/lib/notify';

export function SocialLogin() {
  const router = useRouter();

  async function handleClickAppleLogin() {
    const req = new Promise<string>(resolve =>
      setTimeout(() => resolve('ok-apple'), 2500)
    );

    const result = await notify.promise(req, {
      loading: 'Conectando com a Apple…',
      success: 'Pronto! Login com Apple concluído.',
      error: 'Não foi possível entrar com Apple.',
    });

    console.log('Resultado Apple:', result);
    router.push('/dashboard');
  }

  async function handleClickGoogleLogin() {
    const req = new Promise<{ token: string; user: string }>(resolve =>
      setTimeout(() => resolve({ token: 'abc123', user: 'Felipe Duan' }), 2500)
    );

    const { token, user } = await notify.promise(req, {
      loading: 'Conectando com o Google…',
      success: ({ user }) => `Bem-vindo, ${user}!`,
      error: 'Não foi possível entrar com Google.',
    });

    console.log('Resultado Google:', token, user);
    router.push('/dashboard');
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleClickAppleLogin}
        className="text-foreground/90 w-full"
      >
        <AppleSvg />
        Entrar com Apple
      </Button>
      <Button
        type="button"
        variant={'outline'}
        onClick={handleClickGoogleLogin}
        className="text-foreground/90 w-full"
      >
        <GoogleSvg />
        Entrar com o google
      </Button>
    </>
  );
}
