import { getAdminStats as getAdminStatsFromModel, updateAdminSettings as updateAdminSettingsFromModel } from '../models/Admin.js';

// Get admin statistics
export const getAdminStats = (req, res) => {
  getAdminStatsFromModel((err, results) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json(results);
  });
};

// Update admin settings
export const updateAdminSettings = (req, res) => {
  const settings = req.body;
  updateAdminSettingsFromModel(settings, (err, result) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.status(200).json(result);
  });
};
