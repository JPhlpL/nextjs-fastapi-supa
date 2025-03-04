import { mysqlTable, varchar, int, char, datetime } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: char('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: datetime('createdAt'),
  updatedAt: datetime('updatedAt')
});

export const roles = mysqlTable('roles', {
  id: char('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 100 }),
  user_id: varchar('user_id', { length: 100 }),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt').notNull()
});

// everytime we have changes on schema and it changes directly to the sql
//npx drizzle-kit generate
//npx drizzle-kit push
