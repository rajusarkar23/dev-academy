CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"otp" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"enrollments" text[] DEFAULT '{}'::text[] NOT NULL,
	CONSTRAINT "student_email_unique" UNIQUE("email")
);
