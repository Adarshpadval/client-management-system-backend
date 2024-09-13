import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './config.js';

// Create a database connection pool
const pool = mysql.createPool({
  host:DB_HOST,
  user:DB_USER,
  password:DB_PASSWORD,
  database:DB_NAME
});

// Export a query function that uses the pool
export const query = async (sql, params) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

export default pool;
