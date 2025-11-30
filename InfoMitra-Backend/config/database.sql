-- Active: 1762329389992@@127.0.0.1@5432@InfoMitra-Company

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Tabel Users
CREATE TABLE Users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Tabel MitraBrosurs
CREATE TABLE MitraBrosurs (
    id SERIAL PRIMARY KEY,
    nama_mitra VARCHAR(100),         
    gambar_url VARCHAR(255) NOT NULL,
    link_tujuan VARCHAR(255),        
    posisi_iklan VARCHAR(20) DEFAULT 'grid',
    kategori VARCHAR(50),
    tanggal_mulai TIMESTAMP DEFAULT NOW(),
    tanggal_berakhir TIMESTAMP NOT NULL,
    status_bayar VARCHAR(20) DEFAULT 'lunas',
    created_at TIMESTAMP DEFAULT NOW(),

    user_id UUID NOT NULL,
    CONSTRAINT fk_mitrabrosurs_users
        FOREIGN KEY(user_id) 
        REFERENCES Users(id) 
        ON DELETE CASCADE
);

-- 3. Tabel Harga Iklan
CREATE TABLE harga_iklan (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama_paket VARCHAR(50) NOT NULL,
    harga_dasar DECIMAL(12, 2) NOT NULL,
    badge_label VARCHAR(50),
    daftar_fitur TEXT[],
    setting_diskon JSONB
);

-- 4. Tabel Komentar
CREATE TABLE Testimoni (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    isi_text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_user_testimoni
        FOREIGN KEY(user_id) 
        REFERENCES Users(id)
        ON DELETE CASCADE
);