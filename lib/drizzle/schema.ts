import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Url = sqliteTable('Url', {
  shortPath: text('short_url').unique().notNull().primaryKey(),
  longUrl: text('long_url').unique().notNull()
});
