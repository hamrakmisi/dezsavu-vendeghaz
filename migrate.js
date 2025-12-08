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
      CREATE TABLE IF NOT EXISTS price (
        id INT AUTO_INCREMENT PRIMARY KEY,
        value INT NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS discounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        value INT NOT NULL,
        code VARCHAR(255) NOT NULL UNIQUE,
        validFrom DATE NOT NULL,
        validTo DATE NOT NULL,
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        roleId INT NOT NULL,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL,
        FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        nights INT NOT NULL,
        checkInDate DATE NOT NULL,
        checkOutDate DATE NOT NULL,
        statusId INT NOT NULL,
        discountId INT NULL,
        total INT NOT NULL,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (statusId) REFERENCES statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (discountId) REFERENCES discounts(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await connection.query(`
      INSERT IGNORE INTO price (value)
      SELECT 22500 WHERE NOT EXISTS (SELECT 1 FROM price WHERE id = 1)
    `);

    await connection.query(`
      INSERT IGNORE INTO discounts (value, code, validFrom, validTo)
      SELECT 10, 'TEN', '2025-01-01', '2027-01-01' WHERE NOT EXISTS (SELECT 1 FROM discounts WHERE value = 10 AND code = 'TEN')
    `);

    const insertIfNotExists = async (table, values) => {
      for (const value of values) {
        await connection.query(`
          INSERT IGNORE INTO ${table} (name)
          SELECT ? WHERE NOT EXISTS (SELECT 1 FROM ${table} WHERE name = ?)
        `, [value, value]);
      }
    };

    await insertIfNotExists('roles', ['guest', 'admin']);

    await insertIfNotExists('statuses', ['pending', 'upcoming', 'completed', 'cancelled']);

    console.log('Database migrations completed successfully!');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error.message);
    console.error('Stack trace:', error.stack);
    await connection.end();
    process.exit(1);
  }
}

runMigrations();
