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

// Update admin settings
export const updateAdminSettings = (settings, callback) => {
  const { settingName, settingValue } = settings;
  const query = 'UPDATE admin_settings SET value = ? WHERE name = ?';
  db.query(query, [settingValue, settingName], (err, results) => {
    if (err) {
      console.error('Error updating admin settings:', err);
      return callback(err);
    }
    callback(null, { message: 'Admin settings updated successfully' });
  });
};
