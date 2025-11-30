import express from 'express';
import { getPackages, updatePackage } from '../controllers/hargaIklanController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPackages);
router.put('/:id', authMiddleware(['admin']), updatePackage);

export default router;