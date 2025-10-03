import { SignUpForm } from '@/components/auth/sign-up-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function RegisterForm({
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
          <div className="grid gap-4">
            <SignUpForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
