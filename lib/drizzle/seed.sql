CREATE TABLE `Url` (
	`short_path` text PRIMARY KEY NOT NULL,
	`long_url` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Url_short_path_unique` ON `Url` (`short_path`);--> statement-breakpoint
CREATE UNIQUE INDEX `Url_long_url_unique` ON `Url` (`long_url`);