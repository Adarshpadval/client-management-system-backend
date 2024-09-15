import db from '../config/db.js';

// Get admin statistics
export const getAdminStats = (callback) => {
  const query = 'SELECT COUNT(*) AS totalUsers FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching admin stats:', err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};


