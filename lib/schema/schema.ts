import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const Student = pgTable("student", {
    id: serial().primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    otp: text("otp").notNull(),
    isVerified: boolean("is_verified").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
    enrollments: integer("enrollments").array().notNull().default(sql`'{}'::integer[]`)
})

export const Admin = pgTable("admin", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    password: text("password").notNull(),
    otp: text("otp").notNull(),
    isVerified: boolean("is_verified").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
})


export const Course = pgTable("courses", {
    id: serial("id").primaryKey(),
    slug: text("slug").unique().notNull(),
    courseName: text("course_name").notNull(),
    courseHeading: text("course_heading").notNull(),
    courseShortDescription: text("course_short_description").notNull(),
    courseInstrutor: text("course_instructor").notNull(),
    courseDuration: text("course_duration").notNull(),
    courseStartDate: text("course_start_date").notNull(),
    courseEndDate: text("course_end_date").notNull(),
    studentCapacity: text("student_capacity").notNull(),
    seatsAvailable: text("seats_available"),
    courseDescription: text("course_description").notNull(),
    courseImageURL: text("course_image_url").notNull(),
    courseVideoURL: text("course_video_url").notNull(),
    coursePrice: text("course_price").notNull(),
    createdBy: integer("created_by").references(() => Admin.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date())
})

export const Order = pgTable("order", {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").notNull().references(() => Course.id, { onDelete: "cascade" }),
    student: integer("student").notNull().references(() => Student.id, { onDelete: "cascade" }),
    uniqueOrderIdentifier: text("unique_order_inentifier").unique(),
    courseAmount: text("course_amount").notNull(),
    paymentSessionId: text("payment_session_id").unique(),
    paymentId: text("payment_id").unique(),
    paymentSuccess: boolean("payment_success").default(false),
    isOrderPlaceSuccess: boolean("is_order_place_success").default(false)
})