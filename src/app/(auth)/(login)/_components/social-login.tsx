'use client';

import { AppleSvg } from '@/components/svg/apple';
import { GoogleSvg } from '@/components/svg/google-svg';
import { Button } from '@/components/ui/button';
import { notify } from '@/lib/notify';

export function SocialLogin() {
  async function handleClickAppleLogin() {
    const req = new Promise(resolve => setTimeout(resolve, 1200));

    notify.promise(req, {
      loading: 'Conectando com a Apple…',
      success: 'Pronto! Login com Apple concluído.',
      error: 'Não foi possível entrar com Apple.',
    });
  }

  function handleClickGoogleLogin() {
    const req = new Promise(resolve => setTimeout(resolve, 1200));

    notify.promise(req, {
      loading: 'Conectando com o Google…',
      success: 'Pronto! Login com Google concluído.',
      error: 'Não foi possível entrar com Google.',
    });
  }

  return (
    <>
      <Button
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
