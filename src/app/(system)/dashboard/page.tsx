// app/(system)/dashboard/page.tsx
// Página de exemplo do dashboard
// Server Component que demonstra o uso da estrutura

import { BarChart3, FolderOpen, TrendingUp, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireAuth } from '@/lib/auth';

/**
 * Página do dashboard principal
 * Server Component que busca dados específicos do tenant
 */
export default async function DashboardPage() {
  // Garante que o usuário está autenticado e busca dados
  const { user, tenant } = await requireAuth();

  // Simula busca de métricas do dashboard
  const metrics = await getDashboardMetrics(user, tenant);

  return (
    <div className="space-y-6">
      {/* Cabeçalho da página */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta, {user.name}! Aqui está um resumo das suas
          atividades.
        </p>
      </div>

      {/* Cards de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projetos Ativos
            </CardTitle>
            <FolderOpen className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeProjects}</div>
            <p className="text-muted-foreground text-xs">+2 novos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Ativos
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeClients}</div>
            <p className="text-muted-foreground text-xs">
              {metrics.vipClients} clientes VIP
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {metrics.monthlyRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-muted-foreground text-xs">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conclusão
            </CardTitle>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completionRate}%</div>
            <p className="text-muted-foreground text-xs">
              Projetos concluídos no prazo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Informações do tenant */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Tenant</CardTitle>
          <CardDescription>
            Configurações e limites da sua organização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nome da Organização:</span>
            <span className="text-sm">{tenant.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Plano:</span>
            <Badge variant="outline">Enterprise</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Usuários:</span>
            <span className="text-sm">
              {metrics.totalUsers} / {tenant.settings.limits.maxUsers}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Projetos:</span>
            <span className="text-sm">
              {metrics.totalProjects} / {tenant.settings.limits.maxProjects}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm font-medium">Funcionalidades ativas:</span>
            {tenant.settings.features.vipClients && (
              <Badge variant="secondary">Clientes VIP</Badge>
            )}
            {tenant.settings.features.advancedReports && (
              <Badge variant="secondary">Relatórios Avançados</Badge>
            )}
            {tenant.settings.features.projectTemplates && (
              <Badge variant="secondary">Templates de Projeto</Badge>
            )}
            {tenant.settings.features.integrations && (
              <Badge variant="secondary">Integrações</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Função para buscar métricas do dashboard
 * Deve ser implementada com sua estratégia de banco de dados
 */
async function getDashboardMetrics(user: any, tenant: any) {
  // Simulação de dados - substitua pela sua implementação
  return {
    activeProjects: 12,
    activeClients: 45,
    vipClients: 8,
    monthlyRevenue: 125000,
    completionRate: 87,
    totalUsers: 23,
    totalProjects: 67,
  };
}
