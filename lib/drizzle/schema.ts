import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Url = sqliteTable('Url', {
  id: integer('id', { mode: 'number' })
    .unique()
    .notNull()
    .primaryKey({ autoIncrement: true }),
  creationDate: integer('creation_date', {
    mode: 'timestamp'
  }).notNull(),
  longUrl: text('long_url').unique().notNull(),
  shortUrl: text('short_url').unique().notNull()
});
