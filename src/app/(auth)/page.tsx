import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './_components/login-form';
import { RegisterForm } from './_components/register-form';

export default function AuthenticationPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 bg-[url('/assets/RoxoMassa.png')] bg-cover bg-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="https://github.com/FelipeDuan"
          target="_blank"
          className="text-primary-foreground flex items-center gap-2 self-center font-semibold"
        >
          <div className="bg-primary flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Ghast Consultancy
        </Link>

        <Tabs defaultValue="sign-in">
          <TabsList className="flex w-full justify-center">
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in">
            <LoginForm />
          </TabsContent>

          <TabsContent value="sign-up">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
