import pgp from 'pg-promise';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import tables from './_tableOrder';
dotenv.config();

const db = pgp()({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_URL || 'localhost',
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  user: process.env.DATABASE_USER,
});

const seed = async () => {
  for(const sqlFile of tables) {
    await db.any(fs.readFileSync(path.join(__dirname, 'schema', sqlFile)).toString())
  }
}

seed();