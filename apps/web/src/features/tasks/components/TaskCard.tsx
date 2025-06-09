import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@repo/server";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
    </Card>
  );
}
