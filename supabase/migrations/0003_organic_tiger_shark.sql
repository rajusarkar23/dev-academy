CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"student" integer NOT NULL,
	"course_amount" text NOT NULL,
	"payment_session_id" text NOT NULL,
	"payment_id" text,
	"payment_success" boolean DEFAULT false,
	"is_order_place_success" boolean DEFAULT false,
	CONSTRAINT "order_payment_session_id_unique" UNIQUE("payment_session_id"),
	CONSTRAINT "order_payment_id_unique" UNIQUE("payment_id")
);
--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_student_student_id_fk" FOREIGN KEY ("student") REFERENCES "public"."student"("id") ON DELETE cascade ON UPDATE no action;