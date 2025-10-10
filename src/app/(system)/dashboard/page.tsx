import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from '@/components/animate-ui/components/base/tabs';
import AreaChart1 from '@/components/area-chart-1';
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
