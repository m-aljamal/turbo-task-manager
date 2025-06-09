import Spinner from "@/components/ui/Spinner";
import type { Task } from "@repo/server";
import TaskCard from "./TaskCard";
export default function TasksList({
  tasks,
  isLoading,
}: {
  tasks: Task[];
  isLoading: boolean;
}) {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <div>No tasks found</div>
      ) : (
        <div className="space-y-8 px-10">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
