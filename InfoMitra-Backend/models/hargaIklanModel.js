import pool from '../config/db.js';

export const getAllPackages = async () => {
    const result = await pool.query('SELECT * FROM harga_iklan ORDER BY id ASC');
    return result.rows;
};

export const updatePackageModel = async (id, data) => {
    const query = `
        UPDATE harga_iklan 
        SET 
        nama_paket = $1, 
        harga_dasar = $2, 
        badge_label = $3, 
        daftar_fitur = $4, 
        setting_diskon = $5
        WHERE id = $6
        RETURNING *
    `;

    const values = [
        data.nama_paket,   
        data.harga_dasar,  
        data.badge_label,  
        data.daftar_fitur,
        // kalau error JSON.stringify(data.setting_diskon),
        data.setting_diskon,
        id
    ];

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
        throw new Error(`Paket iklan dengan ID ${id} tidak ditemukan.`);
    }

    return result.rows[0];
};