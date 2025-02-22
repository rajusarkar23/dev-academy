ALTER TABLE "student" ALTER COLUMN "enrollments" SET DATA TYPE integer[];--> statement-breakpoint
ALTER TABLE "student" ALTER COLUMN "enrollments" SET DEFAULT ARRAY[]::integer[];