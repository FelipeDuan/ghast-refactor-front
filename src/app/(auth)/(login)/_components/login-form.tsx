import { SignInForm } from '@/components/auth/sign-in-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SocialLogin } from './social-login';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo(a) à Ghast!</CardTitle>
          <CardDescription>
            Preencha com suas informações de login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <SocialLogin />
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Ou continue com
              </span>
            </div>

            <SignInForm />

            <div className="text-center text-sm">
              Ainda não tem uma conta?
              <Button variant={'link'} className="px-2">
                Criar conta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
