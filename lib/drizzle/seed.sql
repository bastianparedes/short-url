CREATE TABLE Url (
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	creation_date integer NOT NULL,
	long_url text NOT NULL,
	short_url text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX Url_id_unique ON Url (id);--> statement-breakpoint
CREATE UNIQUE INDEX Url_long_url_unique ON Url (long_url);--> statement-breakpoint
CREATE UNIQUE INDEX Url_short_url_unique ON Url (short_url);