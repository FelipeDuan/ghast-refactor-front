import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from '@/components/animate-ui/components/base/tabs';
import AreaChart1 from '@/components/area-chart-1';
import LineChart9 from '@/components/line-chart-9';
import StatisticCard6 from '@/components/static-card';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageHeader } from '@/layout/page-header';

export default function DashboardPage() {
  return (
    <>
      <PageHeader breadcrumbItems={[{ label: 'Início' }]} />

      <div className="flex flex-col gap-6 p-6">
        <AreaChart1 />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <LineChart9 />

          <StatisticCard6 />
        </div>

        <Tabs defaultValue={'estatistica'}>
          <TabsList>
            <TabsTab value={'estatistica'}>Estatísticas</TabsTab>
            <TabsTab value={'card'}>Card</TabsTab>
          </TabsList>
          <TabsPanels>
            <TabsPanel value={'estatistica'}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>DashboardPage</CardTitle>
                  <CardDescription>Essa é a dashboard</CardDescription>
                  <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                  <p>Esse é o card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card footer</p>
                </CardFooter>
              </Card>
            </TabsPanel>
            <TabsPanel value={'card'}>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>Essa é a card</CardDescription>
                  <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                  <p>Esse é o card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card footer</p>
                </CardFooter>
              </Card>
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </div>
    </>
  );
}
