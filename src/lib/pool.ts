import { createPool, Pool } from 'mysql2/promise';

declare global {
  var _pool: Pool | undefined;
}

const pool =
  global._pool ??
  createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'szigetvar_vendeghaz',
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0,
  });

if (!global._pool) global._pool = pool;

export default pool;
