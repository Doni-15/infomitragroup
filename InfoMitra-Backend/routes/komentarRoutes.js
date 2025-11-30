import express from 'express';
import { 
    createTestimoni, 
    deleteTestimoni, 
    getPublicTestimonis,
    getAdminTestimonis
} from '../controllers/komentarController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPublicTestimonis);
router.get('/admin', authMiddleware(['admin']), getAdminTestimonis);

router.post('/', authMiddleware(), createTestimoni);
router.delete('/:id', authMiddleware(), deleteTestimoni);

export default router;