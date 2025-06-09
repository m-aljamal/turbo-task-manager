import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient, trpc as trpcClient } from "./utils/trpc";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <Header />
        <Greeting />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

function Greeting() {
  const trpc = trpcClient;
  const { data } = useQuery(trpc.tasks.getTasks.queryOptions());

  return (
    <div className="p-5">
      {data?.map((task) => (
        <div key={task.id} className="border-b border-gray-700 py-2">
          <p>{task.title}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
