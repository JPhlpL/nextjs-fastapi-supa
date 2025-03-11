import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export default {
  dialect: "postgresql",
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_URL || '',
  },
} satisfies Config;
