import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './lib/schema/schema.ts',
    out: './supabase/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
