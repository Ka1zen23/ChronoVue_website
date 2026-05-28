import { query } from './index.js';

export async function runMigrations() {
  await query(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id          SERIAL PRIMARY KEY,
      first_name  VARCHAR(100) NOT NULL,
      last_name   VARCHAR(100) NOT NULL,
      email       VARCHAR(255) NOT NULL,
      hospital    VARCHAR(255) NOT NULL,
      beds_range  VARCHAR(50),
      message     TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('Migrations complete');
}
