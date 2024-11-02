import express from 'express';
import { getSalesReport } from '../controllers/salesController.js';

const router = express.Router();

router.get('/report', getSalesReport);

export default router;