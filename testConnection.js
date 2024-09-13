import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from './src/config/config.js'; 

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
    console.log('Successfully connected to the database.');
    await connection.end();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

testConnection();
