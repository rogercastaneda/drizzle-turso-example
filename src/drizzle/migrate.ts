import 'dotenv/config';

import { drizzle } from 'drizzle-orm/libsql';

import { dbClient } from './db';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function main() {
  await migrate(drizzle(dbClient), {
    migrationsFolder: './src/drizzle/migrations',
  });
  dbClient.close();
}
main();
