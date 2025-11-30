import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { nama, email, password } = req.body;

    try {
        const existing = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if(existing.rows.length > 0) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const defaultRole = 'user';
        
        const query = `
            INSERT INTO users (nama, email, password, role) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, nama, email, role, created_at
        `;

        const result = await pool.query(query, [nama, email, hashedPassword, defaultRole]);

        res.status(201).json({
            message: "Registrasi Berhasil",
            user: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Server Error" 
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        
        if(userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const payload = { 
            userId: user.id, 
            email: user.email, 
            role: user.role,
            nama: user.nama,
            created_at: user.created_at
        };
        
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

        res.json({ 
            message: "Login Berhasil",
            token, 
            user: { 
                id: user.id, 
                nama: user.nama, 
                email: user.email,
                role: user.role,
                created_at: user.created_at
            } 
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};