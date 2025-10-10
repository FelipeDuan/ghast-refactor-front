'use client';

import {
  CheckCircle,
  MoreHorizontal,
  Pin,
  Settings,
  Share2,
  Trash,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card-ReUI';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// helper p/ moeda BRL
const BRL = (v: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

type TrendDir = 'up' | 'down';

export default function StatisticCard6() {
  // ---- KPIs GHAST (mock) ----
  const performance: Array<{
    label: string;
    value: string;
    trend: number;
    trendDir: TrendDir;
  }> = [
    {
      label: 'Horas Faturáveis',
      value: '1.284 h',
      trend: 7,
      trendDir: 'up',
    },
    {
      label: 'Receita',
      value: BRL(182_400), // R$ 182,4k
      trend: 6,
      trendDir: 'up',
    },
    {
      label: 'Utilização',
      value: '76%',
      trend: 2,
      trendDir: 'up',
    },
  ];

  // Capacidade alocada (quanto da capacidade da equipe está ocupada)
  const capacityAllocated = 72; // %

  // Atividades recentes relevantes no GHAST
  const activity: Array<{
    text: string;
    date: string;
    state: 'secondary' | 'destructive';
    color: string;
  }> = [
    {
      text: '32h aprovadas no Projeto Atlas (semana 41).',
      date: 'Hoje',
      state: 'secondary',
      color: 'text-green-500',
    },
    {
      text: 'Contrato mensal renovado com Boreal Tech (VIP).',
      date: 'Ontem',
      state: 'secondary',
      color: 'text-green-500',
    },
    {
      text: 'Alerta de SLA: risco no Projeto Orion (atraso de entrega).',
      date: 'Há 2 dias',
      state: 'destructive',
      color: 'text-destructive',
    },
  ];

  return (
    <div className="flex h-full items-center justify-center">
      {/* Card */}
      <Card className="h-full w-full">
        <CardHeader className="h-auto py-4">
          <CardTitle className="flex flex-col gap-1">
            <span className="text-lg">Desempenho da Equipe</span>
            <span className="text-muted-foreground text-sm font-normal">
              Consultoria · Tenant atual
            </span>
          </CardTitle>
          <CardToolbar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="-me-1.5">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuItem>
                  <Settings />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TriangleAlert /> Adicionar Alerta
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pin /> Fixar no Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 /> Compartilhar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash />
                  Remover
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardToolbar>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Q3 Performance */}
          <div>
            <div className="text-accent-foreground mb-2.5 text-sm font-medium">
              Desempenho (Q3)
            </div>
            <div className="grid grid-cols-3 gap-2">
              {performance.map(item => (
                <div
                  className="flex flex-col items-start justify-start"
                  key={item.label}
                >
                  <div className="text-foreground text-xl font-bold">
                    {item.value}
                  </div>
                  <div className="text-muted-foreground mb-1 text-xs font-medium">
                    {item.label}
                  </div>

                  <span
                    className={cn(
                      'flex items-center gap-0.5 text-xs font-semibold',
                      item.trendDir === 'up'
                        ? 'text-green-500'
                        : 'text-destructive'
                    )}
                  >
                    {item.trendDir === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {item.trendDir === 'up' ? '+' : '-'}
                    {item.trend}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Capacidade Alocada */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-foreground text-sm font-medium">
                Capacidade Alocada
              </span>
              <span className="text-foreground text-xs font-semibold">
                {capacityAllocated}%
              </span>
            </div>
            <Progress value={capacityAllocated} className="bg-muted" />
          </div>

          <Separator />

          {/* Atividade Recente */}
          <div>
            <div className="text-foreground mb-2.5 text-sm font-medium">
              Atividade Recente
            </div>
            <ul className="space-y-2">
              {activity.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-2.5 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle className={cn('h-3.5 w-3.5', a.color)} />
                    <span className="text-foreground truncate text-xs">
                      {a.text}
                    </span>
                  </span>
                  <Badge
                    variant={
                      a.state === 'secondary' ? 'secondary' : 'destructive'
                    }
                    appearance="light"
                    size="sm"
                  >
                    {a.date}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex h-auto gap-2.5 py-3.5">
          <Button variant="outline" className="flex-1">
            Agendar
          </Button>
          <Button variant="default" className="flex-1">
            Relatório Completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
