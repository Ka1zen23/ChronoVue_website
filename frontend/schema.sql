-- D1 (SQLite) schema — run with:
--   wrangler d1 execute cekap-db --remote --file=schema.sql
-- For local dev:
--   wrangler d1 execute cekap-db --local --file=schema.sql

CREATE TABLE IF NOT EXISTS demo_requests (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  hospital    TEXT NOT NULL,
  beds_range  TEXT,
  message     TEXT,
  created_at  TEXT DEFAULT (datetime('now'))
);
