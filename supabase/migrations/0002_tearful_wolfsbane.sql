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
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_admin_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin"("id") ON DELETE cascade ON UPDATE no action;