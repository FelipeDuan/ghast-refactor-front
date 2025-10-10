'use client';

import { TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';

// ---------- Helpers ----------
const BRL = (v: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

// ---------- GHAST Revenue Trend (MOCK) ----------
// Tipos explícitos para evitar arrays readonly e problemas com Recharts
type RevenuePoint = { date: string; value: number; time?: string };

// Série mutável (sem "as const") — valores simulam faturamento diário/acumulado
const revenueTrendData: RevenuePoint[] = [
  { date: 'Jan 01', value: 850, time: '20:00' },
  { date: 'Jan 02', value: 1100, time: '00:00' },
  { date: 'Jan 03', value: 1680, time: '04:00' },
  { date: 'Jan 04', value: 1490, time: '08:00' },
  { date: 'Jan 05', value: 2020, time: '12:00' },
  { date: 'Jan 06', value: 2080, time: '16:00' },
  { date: 'Jan 07', value: 2180, time: '20:00' },
  { date: 'Jan 08', value: 2250, time: '00:00' },
  { date: 'Jan 09', value: 2480, time: '04:00' },
  { date: 'Jan 10', value: 2290, time: '08:00' },
  { date: 'Jan 11', value: 2450, time: '12:00' },
  { date: 'Jan 12', value: 2380, time: '16:00' },
  { date: 'Jan 13', value: 2220, time: '20:00' },
  { date: 'Jan 14', value: 1980, time: '00:00' },
  { date: 'Jan 15', value: 1750, time: '04:00' },
  { date: 'Jan 16', value: 1620, time: '08:00' },
  // Marco: início de um contrato relevante (linha de referência)
  { date: 'Jan 17', value: 1480, time: '12:00' },
  { date: 'Jan 18', value: 1580, time: '16:00' },
  { date: 'Jan 19', value: 1820, time: '20:00' },
  { date: 'Jan 20', value: 1950, time: '00:00' },
  { date: 'Jan 21', value: 2080, time: '04:00' },
  { date: 'Jan 22', value: 2220, time: '08:00' },
  { date: 'Jan 23', value: 2380, time: '12:00' },
  { date: 'Jan 24', value: 2550, time: '16:00' },
  { date: 'Jan 25', value: 2480, time: '20:00' },
  { date: 'Jan 26', value: 2720, time: '00:00' },
  { date: 'Jan 27', value: 2900, time: '04:00' },
  { date: 'Jan 28', value: 2550, time: '08:00' },
  { date: 'Jan 29', value: 2320, time: '12:00' },
  { date: 'Feb 15', value: 2250, time: '14:00' },
  { date: 'Mar 24', value: 1900, time: '16:00' },
];

// Config do gráfico — use a cor do tenant se quiser (ex.: primary/orange)
const chartConfig = {
  value: {
    label: 'Receita',
    color: 'var(--color-primary)',
  },
} satisfies ChartConfig;

// Métricas do “portfólio” (contexto GHAST)
// currentMRR: simula MRR atual do tenant
const currentMRR = 24847.83;
const todaysRevenue = 1249.0;
const todaysRevenuePct = 8;

// High/Low/Change calculados da série mock
const highValue = Math.max(...revenueTrendData.map(d => d.value));
const lowValue = Math.min(...revenueTrendData.map(d => d.value));
// variação do último ponto vs. anterior
const last = revenueTrendData[revenueTrendData.length - 1]?.value ?? 0;
const prev = revenueTrendData[revenueTrendData.length - 2]?.value ?? last;
const changePct = prev ? ((last - prev) / prev) * 100 : 0;

// ---------- Tooltip ----------
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: RevenuePoint }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover border-border rounded-lg border p-3 shadow-lg">
        <div className="text-muted-foreground mb-1 text-sm">{data.date}</div>
        <div className="flex items-center gap-2">
          <div className="text-base font-bold">{BRL(data.value * 100)}</div>
          <div className="text-[11px] text-emerald-600">+12.7%</div>
        </div>
      </div>
    );
  }
  return null;
};

export default function GhastRevenueTrendMock() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full">
        <CardContent className="flex flex-col items-stretch gap-5">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-muted-foreground mb-1 text-base font-medium">
              Capitação Atual
            </h1>
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-3.5">
              <span className="text-4xl font-bold">{BRL(currentMRR)}</span>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">+12,7%</span>
                <span className="text-muted-foreground font-normal">
                  últimos 30 dias
                </span>
              </div>
            </div>
          </div>

          <div className="grow">
            {/* Stats Row */}
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2.5 text-sm">
              {/* Faturamento de hoje */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    Faturamento de hoje:
                  </span>
                  <span className="font-semibold">{BRL(todaysRevenue)}</span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>(+{todaysRevenuePct}%)</span>
                  </div>
                </div>
              </div>

              {/* High / Low / Change */}
              <div className="text-muted-foreground flex items-center gap-6">
                <span>
                  Máxima:{' '}
                  <span className="font-medium text-sky-600">
                    {BRL(highValue * 100)}
                  </span>
                </span>
                <span>
                  Mínima:{' '}
                  <span className="font-medium text-yellow-600">
                    {BRL(lowValue * 100)}
                  </span>
                </span>
                <span>
                  Variação:{' '}
                  <span
                    className={`font-medium ${
                      changePct >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {changePct.toFixed(2)}%
                  </span>
                </span>
              </div>
            </div>

            {/* Chart */}
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial h-96 w-full"
            >
              <ComposedChart
                data={revenueTrendData}
                margin={{ top: 20, right: 10, left: 5, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={chartConfig.value.color}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="100%"
                      stopColor={chartConfig.value.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <pattern
                    id="dotGrid"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="1"
                      fill="var(--input)"
                      fillOpacity="0.3"
                    />
                  </pattern>
                  <filter
                    id="dotShadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="2"
                      dy="3"
                      stdDeviation="3"
                      floodColor="rgba(0,0,0,0.2)"
                    />
                  </filter>
                  <filter
                    id="lineShadow"
                    x="-100%"
                    y="-100%"
                    width="300%"
                    height="300%"
                  >
                    <feDropShadow
                      dx="4"
                      dy="6"
                      stdDeviation="25"
                      floodColor={chartConfig.value.color}
                    />
                  </filter>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#dotGrid)"
                  style={{ pointerEvents: 'none' }}
                />

                <CartesianGrid
                  strokeDasharray="4 8"
                  stroke="var(--input)"
                  strokeOpacity={1}
                  horizontal
                  vertical={false}
                />

                {/* Marco: data de referência (ex.: contrato ativado) */}
                <ReferenceLine
                  x="Jan 17"
                  stroke={chartConfig.value.color}
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: chartConfig.value.color }}
                  tickMargin={15}
                  interval="preserveStartEnd"
                  tickCount={5}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: chartConfig.value.color }}
                  tickFormatter={v => BRL(v * 100)}
                  tickMargin={15}
                />

                <ChartTooltip
                  content={<CustomTooltip />}
                  cursor={{
                    strokeDasharray: '3 3',
                    stroke: 'var(--muted-foreground)',
                    strokeOpacity: 0.5,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartConfig.value.color}
                  strokeWidth={2}
                  filter="url(#lineShadow)"
                  dot={props => {
                    const { cx, cy, payload } = props;
                    const p: RevenuePoint = payload;
                    if (
                      p.date === 'Jan 17' ||
                      p.value > 2800 ||
                      p.value < 1000
                    ) {
                      return (
                        <circle
                          key={`dot-${p.date}`}
                          cx={cx}
                          cy={cy}
                          r={6}
                          fill={chartConfig.value.color}
                          stroke="white"
                          strokeWidth={2}
                          filter="url(#dotShadow)"
                        />
                      );
                    }
                    return <g key={`dot-${p.date}`} />;
                  }}
                  activeDot={{
                    r: 6,
                    fill: chartConfig.value.color,
                    stroke: 'white',
                    strokeWidth: 2,
                    filter: 'url(#dotShadow)',
                  }}
                />
              </ComposedChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
