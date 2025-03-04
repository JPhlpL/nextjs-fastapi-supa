// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js'; // Import PostgreSQL drizzle
import postgres from 'postgres'; // Import the postgres driver
import * as schema from '@/db/schema'; // Import your schema

// Create a PostgreSQL connection pool
const connection = postgres(process.env.SUPABASE_DATABASE_URL!); // Use your PostgreSQL connection string

// Initialize the Drizzle ORM instance
export const db = drizzle(connection, { schema });