CREATE TYPE "public"."role" AS ENUM('Admin', 'Editor', 'Viewer');--> statement-breakpoint
CREATE TABLE "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"role" "role" DEFAULT 'Viewer' NOT NULL,
	"email" text NOT NULL
);
