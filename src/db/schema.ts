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

export const employees = mysqlTable('employees', {
  id: char('id', { length: 36 }).primaryKey(),
  employeeId: varchar('employeeId', { length: 150 }).notNull().unique(),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  department: varchar('department', { length: 150 }).notNull(),
  section: varchar('section', { length: 150 }).notNull(),
  position: varchar('position', { length: 150 }).notNull(),
  jobLevel: varchar('jobLevel', { length: 150 }).notNull(),
  serviceYears: int('serviceYears').notNull(),
  dateHired: datetime('dateHired').notNull(),
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt').notNull()
});

// export const roles = mysqlTable('roles', {
//   id: char('id', { length: 36 }).primaryKey(),
//   title: varchar('title', { length: 100 }).notNull().unique(),
//   createdAt: datetime('createdAt').notNull(),
//   updatedAt: datetime('updatedAt').notNull()
// });

// export const permissions = mysqlTable('permissions', {
//   id: char('id', { length: 36 }).primaryKey(),
//   description: varchar('description', { length: 100 }).notNull().unique(),
//   createdAt: datetime('createdAt').notNull(),
//   updatedAt: datetime('updatedAt').notNull()
// });

// everytime we have changes on schema and it changes directly to the sql
//npx drizzle-kit generate
//npx drizzle-kit push
