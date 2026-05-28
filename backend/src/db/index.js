import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => console.error('Unexpected DB error', err));

export const query = (text, params) => pool.query(text, params);
export default pool;
