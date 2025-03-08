import { pgTable, varchar, char, timestamp } from 'drizzle-orm/pg-core';
// import { mysqlTable, varchar, int, char, datetime } from 'drizzle-orm/mysql-core';

export const users = pgTable('users', {
  id: char('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 10 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  createdAt: timestamp('createdAt'), // Use timestamp for datetime
  updatedAt: timestamp('updatedAt'),  // Use timestamp for datetime
  role: varchar('role', { length: 10 }).notNull()
});

// everytime we have changes on schema and it changes directly to the sql
//npx drizzle-kit generate
//npx drizzle-kit push