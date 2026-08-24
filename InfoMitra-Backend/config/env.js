import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

function requireValue(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Konfigurasi wajib belum tersedia: ${name}`);
    }
    return value;
}

export function validateRuntimeConfig() {
    const jwtSecret = requireValue('JWT_SECRET');

    if (isProduction) {
        if (jwtSecret.length < 32) {
            throw new Error('JWT_SECRET production minimal 32 karakter acak.');
        }

        for (const name of ['CLIENT_URL', 'PUBLIC_BASE_URL']) {
            const url = new URL(requireValue(name));
            if (url.protocol !== 'https:') {
                throw new Error(`${name} production wajib menggunakan HTTPS.`);
            }
        }
        const hasConnectionString = Boolean(
            process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim()
        );
        const hasDiscreteDatabaseConfig = [
            'DB_HOST',
            'DB_USER',
            'DB_PASSWORD',
            'DB_NAME',
        ].every((name) => Boolean(process.env[name]?.trim()));

        if (!hasConnectionString && !hasDiscreteDatabaseConfig) {
            throw new Error(
                'Konfigurasi database production wajib memakai DATABASE_URL/POSTGRES_URL atau seluruh DB_*.'
            );
        }
    }
}

export function databaseCa() {
    if (process.env.DB_CA?.trim()) {
        return process.env.DB_CA.replace(/\\n/g, '\n');
    }

    const caPath = process.env.DB_CA_PATH?.trim();
    return caPath ? fs.readFileSync(caPath, 'utf8') : undefined;
}

export const runtimeConfig = {
    isProduction,
    jwtSecret: requireValue('JWT_SECRET'),
    clientUrl: process.env.CLIENT_URL?.trim() || 'http://localhost:5173',
    publicBaseUrl: process.env.PUBLIC_BASE_URL?.trim() || 'http://localhost:5000',
};
