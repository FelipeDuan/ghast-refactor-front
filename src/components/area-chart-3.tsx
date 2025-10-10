'use client';

import { ChartNoAxesCombined, Info, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Area, AreaChart, XAxis } from 'recharts';
import {
  Tooltip,
  TooltipPanel,
  TooltipTrigger,
} from '@/components/animate-ui/components/base/tooltip';
import {
  Card,
  CardContent,
  CardHeader,
  CardHeading,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card-ReUI';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

/**
 * GHAST – Horas Faturáveis por período (MOCK)
 * Quando integrar com a API do dashboard por tenant:
 * - Substitua os arrays abaixo pelos dados reais (filtrados por tenant)
 * - Opcional: injete a cor primária do tenant no chartConfig.hours.color
 */

// 1) tipos antes dos mocks
type PeriodKey = '5D' | '2W' | '1M' | '6M';
type Point = { period: string; hours: number };

// Dados mockados (horas) por período
const billableHoursData: Record<PeriodKey, Point[]> = {
  '5D': [
    { period: 'Mon', hours: 42.5 },
    { period: 'Tue', hours: 56.2 },
    { period: 'Wed', hours: 61.8 },
    { period: 'Thu', hours: 58.3 },
    { period: 'Fri', hours: 73.1 },
  ],
  '2W': [
    { period: 'W1', hours: 312.4 },
    { period: 'W2', hours: 355.7 },
    { period: 'W3', hours: 298.9 },
    { period: 'W4', hours: 389.6 },
    { period: 'W5', hours: 344.2 },
    { period: 'W6', hours: 402.7 },
  ],
  '1M': [
    { period: 'W1', hours: 680.5 },
    { period: 'W2', hours: 742.3 },
    { period: 'W3', hours: 705.9 },
    { period: 'W4', hours: 821.4 },
    { period: 'W5', hours: 795.2 },
    { period: 'W6', hours: 888.7 },
    { period: 'W7', hours: 840.1 },
    { period: 'W8', hours: 915.4 },
  ],
  '6M': [
    { period: 'Jan', hours: 2850.3 },
    { period: 'Feb', hours: 3127.7 },
    { period: 'Mar', hours: 2984.2 },
    { period: 'Apr', hours: 3542.8 },
    { period: 'May', hours: 3390.6 },
    { period: 'Jun', hours: 3712.4 },
  ],
} as const;

// Config do gráfico (use a cor do tenant aqui, se quiser)
// Mantive laranja para combinar com teus cards
const chartConfig = {
  hours: {
    label: 'Horas Faturáveis',
    color: 'var(--color-orange-500)',
  },
} satisfies ChartConfig;

// Períodos
const PERIODS = {
  '5D': { key: '5D', label: '5D' },
  '2W': { key: '2W', label: '2W' },
  '1M': { key: '1M', label: '1M' },
  '6M': { key: '6M', label: '6M' },
} as const;

// Tooltip customizada (horas)
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const v = payload[0].value ?? 0;
    const formatted =
      v >= 1000 ? `${(v / 1000).toFixed(1)}K h` : `${v.toFixed(1)} h`;
    return (
      <div className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-lg">
        {formatted}
      </div>
    );
  }
  return null;
};

export default function GhastBillableHoursCardMock() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('5D');

  // Dados do período selecionado
  const currentData = billableHoursData[selectedPeriod];

  // Soma total do período
  const totalHours = useMemo(
    () => currentData.reduce((sum, item) => sum + item.hours, 0),
    [currentData]
  );

  // Exibição amigável da métrica principal
  const totalLabel =
    totalHours >= 1000
      ? `${(totalHours / 1000).toFixed(1)}K h`
      : `${totalHours.toFixed(1)} h`;

  return (
    <div className="h-full">
      <div className="bg-muted/50 dark:bg-card border-border/60 h-full w-full rounded-3xl border p-2 shadow-sm backdrop-blur-xl">
        <Card className="bg-background border-border/50 h-full rounded-3xl p-5">
          <CardHeader className="border-border mb-6 flex-nowrap! border-b p-0 pt-1 pb-6">
            <CardHeading className="flex items-center gap-2.5 space-y-0">
              <div className="bg-muted/80 flex size-10 items-center justify-center rounded-full">
                <ChartNoAxesCombined className="size-5" />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <CardTitle className="text-foreground text-base leading-none font-semibold">
                  Utilização & Horas Faturáveis
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Lançamentos por período (tenant)
                </p>
              </div>
            </CardHeading>
            <CardToolbar>
              <Tooltip>
                <TooltipTrigger>
                  <span>
                    <Info className="fill-muted/60 text-muted-foreground size-4" />
                  </span>
                </TooltipTrigger>
                <TooltipPanel>
                  <p>
                    Total de horas faturáveis registradas no período
                    selecionado. Valores fictícios para demonstração (mock).
                  </p>
                </TooltipPanel>
              </Tooltip>
            </CardToolbar>
          </CardHeader>

          <CardContent className="space-y-6 p-0">
            {/* Cabeçalho da métrica + seletor de período */}
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="text-foreground text-3xl font-semibold">
                  {totalLabel}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="size-4 text-emerald-600" />
                  <span className="font-medium text-emerald-600">+12%</span>
                  <span className="text-gray-600">
                    em relação ao último{' '}
                    {selectedPeriod === '5D'
                      ? 'período equivalente'
                      : 'período'}
                  </span>
                </div>
              </div>

              <ToggleGroup
                type="single"
                value={selectedPeriod}
                onValueChange={value =>
                  value && setSelectedPeriod(value as PeriodKey)
                }
                variant="outline"
                className="w-full shadow-none!"
              >
                {Object.values(PERIODS).map(period => (
                  <ToggleGroupItem
                    key={period.key}
                    value={period.key}
                    className="data-[state=on]:bg-muted/60 flex-1 shadow-none"
                  >
                    {period.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Gráfico */}
            <div className="w-full">
              <ChartContainer
                config={chartConfig}
                className="[&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial h-full w-full overflow-hidden rounded-b-3xl"
              >
                <AreaChart
                  data={currentData}
                  margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="hoursGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={chartConfig.hours.color}
                        stopOpacity={0.85}
                      />
                      <stop
                        offset="95%"
                        stopColor={chartConfig.hours.color}
                        stopOpacity={0.12}
                      />
                    </linearGradient>

                    <filter
                      id="activeDotShadow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="2"
                        dy="2"
                        stdDeviation="4"
                        floodColor={chartConfig.hours.color}
                        floodOpacity="0.6"
                      />
                    </filter>
                  </defs>

                  <XAxis dataKey="period" hide />

                  <ChartTooltip
                    content={<CustomTooltip />}
                    cursor={{
                      strokeWidth: 1,
                      strokeDasharray: '2 2',
                      stroke: chartConfig.hours.color,
                      strokeOpacity: 1,
                    }}
                  />

                  <Area
                    dataKey="hours"
                    type="natural"
                    fill="url(#hoursGradient)"
                    stroke={chartConfig.hours.color}
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: chartConfig.hours.color,
                      stroke: 'white',
                      strokeWidth: 2,
                      filter: 'url(#activeDotShadow)',
                    }}
                    activeDot={{
                      r: 6,
                      fill: chartConfig.hours.color,
                      stroke: 'white',
                      strokeWidth: 2,
                      filter: 'url(#activeDotShadow)',
                    }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
