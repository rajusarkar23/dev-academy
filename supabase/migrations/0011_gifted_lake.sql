ALTER TABLE "student" ALTER COLUMN "enrollments" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "student" ALTER COLUMN "enrollments" SET DEFAULT ARRAY[]::text[];