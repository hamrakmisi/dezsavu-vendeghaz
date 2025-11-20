import { createPool } from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'szigetvar_vendeghaz',
  waitForConnections: true,
  connectionLimit: 25,
  queueLimit: 0
};

const pool = createPool(dbConfig);

export default pool;