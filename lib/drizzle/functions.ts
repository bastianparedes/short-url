import { eq } from 'drizzle-orm';
import * as schema from './schema';
import db from './index';

const getLongUrl = async ({ shortPath }: { shortPath: string }) => {
  return (
    await db.query.Url.findFirst({
      columns: {
        longUrl: true
      },
      where: eq(schema.Url.shortPath, shortPath)
    })
  )?.longUrl;
};

const insertUrl = async ({ longUrl }: { longUrl: string }) => {
  const longUrlData = await db.query.Url.findFirst({
    where: eq(schema.Url.longUrl, longUrl)
  });

  const longUrlIsAlreadyStored = longUrlData !== undefined;
  if (longUrlIsAlreadyStored) return process.env.ORIGIN + longUrlData.shortPath;

  while (true) {
    const shortPath = (Math.random() * 2 ** 53).toString(36);
    const shortPathIsUsed =
      (await db.query.Url.findFirst({
        where: eq(schema.Url.shortPath, shortPath)
      })) !== undefined;
    if (shortPathIsUsed) continue;

    const result = await db
      .insert(schema.Url)
      .values({
        shortPath: shortPath,
        longUrl
      })
      .returning();

    return process.env.ORIGIN + result[0].shortPath;
  }
};

export { getLongUrl, insertUrl };
