import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { runtimeConfig, validateRuntimeConfig } from './config/env.js';

import authRoutes from './routes/authRoutes.js';
import brosurRoutes from './routes/brosurRoutes.js';
import hargaIklanRoutes from './routes/hargaIklanRoutes.js';
import testimoniRoute from './routes/komentarRoutes.js';

validateRuntimeConfig();

const app = express();

const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Folder 'uploads' berhasil dibuat otomatis.");
}

app.use(cors({
    origin: runtimeConfig.clientUrl,
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use('/uploads', express.static(uploadDir, {
    setHeaders: (res) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
    },
}));

app.use('/api/auth', authRoutes);
app.use('/api/brosur', brosurRoutes);
app.use('/api/harga-iklan', hargaIklanRoutes);
app.use('/api/testimoni', testimoniRoute); 

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: process.env.NODE_ENV === 'production' && statusCode >= 500
            ? 'Terjadi kesalahan pada server.'
            : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

export default app;
