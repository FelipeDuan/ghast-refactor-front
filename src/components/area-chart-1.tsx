'use client';

import { Activity, CircleDollarSign, TrendingUp, UserPlus } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

/**
 * GHAST Dashboard (Mock)
 * Quando a API estiver pronta, basta substituir os arrays abaixo pelos dados reais
 * e (opcionalmente) mover o conteúdo para um hook de fetch.
 */

// Receita do tenant nos últimos 28 dias (valores em USD para exemplo)
const revenueSeries = [
  { value: 1200 },
  { value: 4200 },
  { value: 2100 },
  { value: 5600 },
  { value: 1700 },
  { value: 6400 },
  { value: 3200 },
  { value: 7000 },
  { value: 2100 },
  { value: 1200 },
  { value: 4300 },
  { value: 2100 },
  { value: 3300 },
  { value: 2100 },
  { value: 6500 },
];

// Projetos ativos por dia (contagem)
const activeProjectsSeries = [
  { value: 8 },
  { value: 9 },
  { value: 7 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 10 },
  { value: 13 },
  { value: 12 },
  { value: 9 },
  { value: 11 },
  { value: 10 },
  { value: 12 },
  { value: 13 },
  { value: 12 },
];

// Clientes VIP (contagem por dia, mock simples só p/ visual)
const vipClientsSeries = [
  { value: 2 },
  { value: 2 },
  { value: 3 },
  { value: 3 },
  { value: 4 },
  { value: 4 },
  { value: 4 },
  { value: 5 },
  { value: 5 },
  { value: 5 },
  { value: 6 },
  { value: 6 },
  { value: 6 },
  { value: 7 },
  { value: 7 },
];

// Uso de API (total de chamadas por dia) — CARD LARANJA
const apiUsageSeries = [
  { value: 180 },
  { value: 220 },
  { value: 160 },
  { value: 240 },
  { value: 210 },
  { value: 260 },
  { value: 230 },
  { value: 290 },
  { value: 200 },
  { value: 170 },
  { value: 250 },
  { value: 300 },
  { value: 280 },
  { value: 260 },
  { value: 310 },
];

// “snapshot” (topo do card)
const snapshot = {
  revenueTotal: 21450, // ex.: USD (mock)
  activeProjects: 12,
  vipClients: 7,
  apiCalls: 310, // último dia / total no período, escolha o que preferir
};

// helpers de formatação
const fmtCurrency = (v: number) =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
const fmtInt = (v: number) => `${Math.round(v)}`;

const cards = [
  {
    title: 'Receita',
    period: 'Últimos 28 dias',
    value: fmtCurrency(snapshot.revenueTotal),
    data: revenueSeries,
    color: 'var(--color-emerald-500)',
    icon: CircleDollarSign,
    gradientId: 'ghastRevenueGradient',
    fmtTooltip: (v: number) => fmtCurrency(v),
  },
  {
    title: 'Projetos Ativos',
    period: 'Últimos 28 dias',
    value: fmtInt(snapshot.activeProjects),
    data: activeProjectsSeries,
    color: 'var(--color-blue-500)',
    icon: TrendingUp,
    gradientId: 'ghastProjectsGradient',
    fmtTooltip: (v: number) => fmtInt(v),
  },
  {
    title: 'Clientes VIP',
    period: 'Últimos 28 dias',
    value: fmtInt(snapshot.vipClients),
    data: vipClientsSeries,
    color: 'var(--color-violet-500)',
    icon: UserPlus,
    gradientId: 'ghastVipGradient',
    fmtTooltip: (v: number) => fmtInt(v),
  },
  // 🔶 card laranja
  {
    title: 'Uso de API / Atividade',
    period: 'Últimos 28 dias',
    value: fmtInt(snapshot.apiCalls),
    data: apiUsageSeries,
    color: 'var(--color-orange-500)',
    icon: Activity,
    gradientId: 'ghastApiGradient',
    fmtTooltip: (v: number) => `${fmtInt(v)} calls`,
  },
] as const;

export default function GhastTenantCardsMock() {
  return (
    <div className="flex items-center justify-center">
      <div className="@container w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card key={card.title}>
                <CardContent className="space-y-5">
                  {/* header */}
                  <div className="flex items-center gap-2">
                    <Icon className="size-5" style={{ color: card.color }} />
                    <span className="text-base font-semibold">
                      {card.title}
                    </span>
                  </div>

                  <div className="flex items-end justify-between gap-2.5">
                    {/* detalhes */}
                    <div className="flex flex-col gap-1">
                      <div className="text-muted-foreground text-sm whitespace-nowrap">
                        {card.period}
                      </div>
                      <div className="text-foreground text-3xl font-bold tracking-tight">
                        {card.value}
                      </div>
                    </div>

                    {/* chart */}
                    <div className="relative h-16 w-full max-w-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={card.data}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient
                              id={card.gradientId}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={card.color}
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor={card.color}
                                stopOpacity={0.05}
                              />
                            </linearGradient>
                            <filter
                              id={`dotShadow${i}`}
                              x="-50%"
                              y="-50%"
                              width="200%"
                              height="200%"
                            >
                              <feDropShadow
                                dx="2"
                                dy="2"
                                stdDeviation="3"
                                floodColor="rgba(0,0,0,0.5)"
                              />
                            </filter>
                          </defs>

                          <Tooltip
                            cursor={{
                              stroke: card.color,
                              strokeWidth: 1,
                              strokeDasharray: '2 2',
                            }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const value = Number(payload[0].value);
                                return (
                                  <div className="bg-background/95 border-border pointer-events-none rounded-lg border p-2 shadow-lg backdrop-blur-sm">
                                    <p className="text-foreground text-sm font-semibold">
                                      {card.fmtTooltip(value)}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />

                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={card.color}
                            fill={`url(#${card.gradientId})`}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              r: 6,
                              fill: card.color,
                              stroke: 'white',
                              strokeWidth: 2,
                              filter: `url(#dotShadow${i})`,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
