import { getAdminStats as getAdminStatsFromModel } from '../models/Admin.js';

// Get admin statistics
export const getAdminStats = (req, res) => {
  getAdminStatsFromModel((err, results) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json(results);
  });
};

