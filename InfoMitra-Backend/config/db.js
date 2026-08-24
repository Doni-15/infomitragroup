import { Pool } from "pg";
import { databaseCa, runtimeConfig } from './env.js';

const isProduction = runtimeConfig.isProduction;
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const useTls = isProduction || process.env.DB_SSL === 'true';
const ca = databaseCa();
const ssl = useTls
    ? { rejectUnauthorized: true, ...(ca ? { ca } : {}) }
    : false;

const pool = new Pool({
    ...(connectionString ? { connectionString } : {}),
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl,
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err) => {
    console.error("Database error", err.message); 
});

export default pool;
