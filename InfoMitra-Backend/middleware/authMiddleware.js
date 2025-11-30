import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
    throw new Error("FATAL ERROR: JWT_SECRET missing in env");
}

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
            const decoded = jwt.verify(token, SECRET_KEY);
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