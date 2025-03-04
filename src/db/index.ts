// src/db/index.ts
import { drizzle, MySql2DrizzleConfig } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@/db/schema';

const connection = mysql.createPool(process.env.DATABASE_URL!);

const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: process.env.NODE_ENV === 'production' ? 'default' : 'default', // Use 'default' for regular MySQL
};

export const db = drizzle(connection, config);
