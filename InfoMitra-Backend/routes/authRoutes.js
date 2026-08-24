import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { message: 'Terlalu banyak percobaan. Coba kembali beberapa saat lagi.' },
});

router.post('/register', authRateLimit, register);
router.post('/login', authRateLimit, login);

export default router;
