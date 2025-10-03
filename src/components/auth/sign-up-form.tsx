'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z
  .object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.email('Email inválido'),
    password: z.string('Senha inválida').min(6, 'Mínimo de 6 caracteres'),
    passwordConfirmation: z
      .string('Senha inválida')
      .min(6, 'Mínimo de 6 caracteres'),
  })
  .refine(
    data => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Confirma senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite sua senha novamente"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full">
          Criar Conta
        </Button>
      </form>
    </Form>
  );
}
