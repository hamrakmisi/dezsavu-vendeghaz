import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'szigetvar_vendeghaz',
};

const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

async function waitForDatabase() {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
      });
      await connection.end();
      console.log('Database is ready!');
      return true;
    } catch (error) {
      console.log(`Waiting for database... (attempt ${i}/${MAX_RETRIES})`);
      if (i === MAX_RETRIES) {
        throw new Error(`Database not available after ${MAX_RETRIES} attempts`);
      }
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

async function runMigrations() {
  let connection;

  try {
    console.log('Starting database migrations...');
    
    await waitForDatabase();
    
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });

    console.log('Connected to MySQL server');

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    console.log(`Database '${dbConfig.database}' ready`);

    await connection.query(`USE \`${dbConfig.database}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS statuses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS prices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        value INT NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        roleId INT NOT NULL,
        createdAt DATE NOT NULL,
        updatedAt DATE NOT NULL,
        FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        nights INT NOT NULL,
        \`from\` DATE NOT NULL,
        \`to\` DATE NOT NULL,
        statusId INT NOT NULL,
        priceId INT NOT NULL,
        total INT NOT NULL,
        createdAt DATE NOT NULL,
        updatedAt DATE NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (statusId) REFERENCES statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (priceId) REFERENCES prices(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    console.log('Database migrations completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Migration failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigrations();
