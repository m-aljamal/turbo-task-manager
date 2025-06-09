import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient, trpc as trpcClient } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";
import TasksList from "./features/tasks/components/TasksList";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Header />
        <Index />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

function Index() {
  const trpc = trpcClient;
  const tasks = useQuery(trpc.tasks.getTasks.queryOptions());

  return <TasksList tasks={tasks.data ?? []} isLoading={tasks.isLoading} />;
}
