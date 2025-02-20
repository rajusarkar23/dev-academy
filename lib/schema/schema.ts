import { sql } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const Student = pgTable("student", {
    id: serial().primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    otp: text("otp").notNull(),
    isVerified: boolean("is_verified").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
    enrollments: text("enrollments").array().notNull().default(sql`'{}'::text[]`)
})