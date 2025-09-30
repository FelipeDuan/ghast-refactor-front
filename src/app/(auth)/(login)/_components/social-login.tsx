'use client';

import { toast } from 'sonner';
import { AppleSvg } from '@/components/svg/apple';
import { GoogleSvg } from '@/components/svg/google-svg';
import { Button } from '@/components/ui/button';

export function SocialLogin() {
  function handleClickAppleLogin() {
    toast('Realizando login com Apple');
  }

  function handleClickGoogleLogin() {
    toast('Realizando login com Google');
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
