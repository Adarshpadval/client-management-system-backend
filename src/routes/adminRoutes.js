import express from 'express';
import { getAdminStats } from '../controllers/adminController.js'; // Correct import

const router = express.Router();

router.get('/stats', getAdminStats);

export default router;
