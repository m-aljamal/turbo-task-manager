import 'dotenv/config';
import { db } from ".";
import { tasksTable } from "./schema";

async function seed() {
  const tasks = [
    {
      title: "Task 1",
      description: "Description 1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      title: "Task 2",
      description: "Description 2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  await db.insert(tasksTable).values(tasks);

  console.log("Tasks seeded successfully");
}

seed();
