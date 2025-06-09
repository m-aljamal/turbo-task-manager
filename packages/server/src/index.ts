import { publicProcedure, router, createContext } from "./trpc";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import cors from "cors";
import { tasksRouter } from "./features/tasks/routes";
 const appRouter = router({
  greeting: publicProcedure.query(() => "hello tRPC v10!!!!!! @@@@@wow"),
  tasks: tasksRouter,
});
// todo: change to ./dist/index.js in package.json
export type AppRouter = typeof appRouter;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000);
