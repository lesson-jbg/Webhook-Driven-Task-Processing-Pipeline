CREATE TABLE "pipelines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"webhook_path" text NOT NULL,
	"action_type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "pipelines_webhook_path_unique" UNIQUE("webhook_path")
);
