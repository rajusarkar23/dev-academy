ALTER TABLE "order" ADD COLUMN "unique_order_inentifier" text;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_unique_order_inentifier_unique" UNIQUE("unique_order_inentifier");