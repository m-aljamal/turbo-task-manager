 import { db } from "../../database";
import { tasksTable } from "../../database/schema";
import { publicProcedure, router } from "../../trpc";

export const tasksRouter = router({
   getTasks: publicProcedure.query(async () => {
    const tasks = await db.select().from(tasksTable);
    return tasks;
  }),
 
});
