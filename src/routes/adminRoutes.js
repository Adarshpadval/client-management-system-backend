import express from 'express';
import { getAdminStats, updateAdminSettings } from '../controllers/adminController.js'; // Correct import

const router = express.Router();

router.get('/stats', getAdminStats);
router.put('/settings', updateAdminSettings);

export default router;
