ALTER TABLE "order" ADD COLUMN "order_failed_email_sent" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "updated_at" timestamp;