import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
 
 