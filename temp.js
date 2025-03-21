import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle({ client: pool });

async function main() {
  try {
    const result = await db.execute(sql`SELECT * FROM users`);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error querying users:', error);
  } finally {
    process.exit(0);
  }
}

main();
