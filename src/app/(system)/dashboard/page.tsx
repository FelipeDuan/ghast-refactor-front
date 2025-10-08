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
      <PageHeader />
      <div className="p-6">
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
      </div>
    </>
  );
}
