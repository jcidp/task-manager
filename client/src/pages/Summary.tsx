import TaskList from "@/components/TaskList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useApi from "@/hooks/useApi";
import { isDueToday, isOverdue } from "@/lib/utils";
import { SummaryTasks, Task } from "@/types";
import { useEffect, useState } from "react";

const initialSummaryTasks: SummaryTasks = {
  overdue: [],
  today: [],
  noDue: [],
};

const Summary = () => {
  const api = useApi();
  const [tasks, setTasks] = useState<SummaryTasks>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const tasks = await api.get<Task[]>("/summary");
      const summaryTasks = tasks.reduce(
        (obj: SummaryTasks, task: Task) => {
          if (isOverdue(task.due_date)) obj.overdue = [...obj.overdue, task];
          else if (isDueToday(task.due_date)) obj.today = [...obj.today, task];
          else obj.noDue = [...obj.noDue, task];
          return obj;
        },
        { ...initialSummaryTasks },
      );
      setTasks(summaryTasks);
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load summary data",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-16 h-16" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchTasks} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1>My tasks</h1>
      <h2>Overdue</h2>
      <TaskList tasks={tasks?.overdue} />
      <h2>Today</h2>
      <TaskList tasks={tasks?.today} />
      <h2>No due</h2>
      <TaskList tasks={tasks?.noDue} />
    </>
  );
};

export default Summary;
