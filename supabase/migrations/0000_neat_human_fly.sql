CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"password" text NOT NULL,
	"otp" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"course_name" text NOT NULL,
	"course_heading" text NOT NULL,
	"course_short_description" text NOT NULL,
	"course_instructor" text NOT NULL,
	"course_duration" text NOT NULL,
	"course_start_date" text NOT NULL,
	"course_end_date" text NOT NULL,
	"student_capacity" text NOT NULL,
	"seats_available" text,
	"course_description" text NOT NULL,
	"course_image_url" text NOT NULL,
	"course_video_url" text NOT NULL,
	"course_price" text NOT NULL,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"student" integer NOT NULL,
	"unique_order_inentifier" text,
	"course_amount" text NOT NULL,
	"payment_session_id" text,
	"payment_id" text,
	"payment_success" boolean DEFAULT false,
	"is_order_place_success" boolean DEFAULT false,
	"order_failed_email_sent" boolean DEFAULT false,
	"order_success_email_sent" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "order_unique_order_inentifier_unique" UNIQUE("unique_order_inentifier"),
	CONSTRAINT "order_payment_session_id_unique" UNIQUE("payment_session_id"),
	CONSTRAINT "order_payment_id_unique" UNIQUE("payment_id")
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"profile_image_url" text DEFAULT 'https://pub-367a5b1b28f9415dae5b51f69d042dff.r2.dev/145857007_307ce493-b254-4b2d-8ba4-d12c080d6651.svg' NOT NULL,
	"password" text NOT NULL,
	"otp" text NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"enrollments" integer[] DEFAULT '{}'::integer[] NOT NULL,
	CONSTRAINT "student_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_url" text NOT NULL,
	"course_ref" integer NOT NULL,
	"video_title" text NOT NULL,
	"video_order" integer NOT NULL,
	"created_At" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_admin_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_student_student_id_fk" FOREIGN KEY ("student") REFERENCES "public"."student"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_course_ref_courses_id_fk" FOREIGN KEY ("course_ref") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;