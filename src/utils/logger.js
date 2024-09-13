import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, 'error.log');

export const logError = (error) => {
  fs.appendFile(logFilePath, `${new Date().toISOString()} - ${error}\n`, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};
