import jwt from 'jsonwebtoken';
import { runtimeConfig } from '../config/env.js';

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Akses Ditolak. Format token salah atau tidak ada.' 
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                message: 'Token kosong.'
            });
        }

        try {
            const decoded = jwt.verify(token, runtimeConfig.jwtSecret);
            req.user = decoded;
            req.userId = decoded.userId; 

            if (roles.length > 0 && !roles.includes(decoded.role)) {
                return res.status(403).json({ 
                    message: 'Akses Ditolak. Anda tidak memiliki izin.' 
                });
            }

            next();
        } catch (err) {
            return res.status(401).json({ 
                message: 'Token tidak valid atau sudah kadaluarsa.' 
            });
        }
    };
};

export default authMiddleware;
