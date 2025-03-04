import { pgTable, varchar, char, timestamp } from 'drizzle-orm/pg-core';
// import { mysqlTable, varchar, int, char, datetime } from 'drizzle-orm/mysql-core';

export const users = pgTable('users', {
  id: char('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt'), // Use timestamp for datetime
  updatedAt: timestamp('updatedAt')  // Use timestamp for datetime
});

export const roles = pgTable('roles', {
  id: char('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 100 }),
  user_id: varchar('user_id', { length: 100 }),
  createdAt: timestamp('createdAt').notNull(), // Use timestamp for datetime
  updatedAt: timestamp('updatedAt').notNull()  // Use timestamp for datetime
});