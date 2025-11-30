import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js'; 
import upload from '../middleware/uploadMiddleware.js'; 

import { 
    getVipBrosurs,
    getGridBrosurs,
    getAllBrosursAdmin,
    getBrosurById, 
    getMyBrosurs,
    createBrosur, 
    updateBrosur, 
    deleteBrosur 
} from '../controllers/brosurController.js';

const router = express.Router();

router.get('/vip', getVipBrosurs); 
router.get('/grid', getGridBrosurs); 
router.get('/my', authMiddleware(), getMyBrosurs);

router.get('/admin/all', authMiddleware(['admin']), getAllBrosursAdmin);

router.post('/', authMiddleware(['admin']), upload.single('gambar'), createBrosur);
router.put('/:id', authMiddleware(['admin']), upload.single('gambar'), updateBrosur);
router.delete('/:id', authMiddleware(['admin']), deleteBrosur);

router.get('/:id', getBrosurById);

export default router;