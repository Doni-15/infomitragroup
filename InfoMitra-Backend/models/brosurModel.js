import pool from '../config/db.js';

const Brosur = {
    getAll: async () => {        
        const res = await pool.query(`
            SELECT m.*, u.nama as owner_name, u.email as owner_email
            FROM MitraBrosurs m
            JOIN Users u ON m.user_id = u.id
            ORDER BY m.created_at DESC`
        );
        return res.rows;
    },

    getActiveByPosisi: async (posisi) => {
        const res = await pool.query(`
            SELECT id, nama_mitra, gambar_url, link_tujuan, kategori 
            FROM MitraBrosurs 
            WHERE posisi_iklan = $1 
            AND status_bayar = 'lunas' 
            AND tanggal_berakhir >= NOW()
            ORDER BY created_at DESC`, 
            [posisi]
        );
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT m.*, u.email as owner_email 
            FROM MitraBrosurs m
            LEFT JOIN Users u ON m.user_id = u.id
            WHERE m.id = $1`, 
            [id]
        );
        return res.rows[0];
    },

    getByUserId: async (userId) => {
        const res = await pool.query(`
            SELECT * FROM MitraBrosurs 
            WHERE user_id = $1 
            ORDER BY created_at DESC`, 
            [userId]
        );
        return res.rows;
    },

    create: async (data) => {
        const { 
            email_user,
            nama_mitra, kategori, gambar_url, link_tujuan, posisi_iklan, durasi_bulan 
        } = data;
        
        const durasi = durasi_bulan || 1; 

        const query = `
            INSERT INTO MitraBrosurs (
                user_id,
                nama_mitra, 
                kategori, 
                gambar_url, 
                link_tujuan, 
                posisi_iklan, 
                tanggal_mulai, 
                tanggal_berakhir
            ) 
            SELECT 
                id,
                $2, $3, $4, $5, $6, 
                NOW(), 
                NOW() + ($7 * INTERVAL '1 month') 
            FROM Users 
            WHERE email = $1
            RETURNING * `;
        
        const res = await pool.query(query, [
            email_user,
            nama_mitra,
            kategori,
            gambar_url,
            link_tujuan,
            posisi_iklan,
            durasi
        ]);
        
        if (res.rows.length === 0) {
            return null;
        }
        
        return res.rows[0];
    },

    update: async (id, data) => {
        const { 
            nama_mitra, kategori, gambar_url, link_tujuan, posisi_iklan, status_bayar, tanggal_berakhir 
        } = data;
        
        const query = `
            UPDATE MitraBrosurs 
            SET nama_mitra=$1, kategori=$2, gambar_url=$3, link_tujuan=$4, posisi_iklan=$5, status_bayar=$6, tanggal_berakhir=$7
            WHERE id=$8
            RETURNING *
        `;
        
        const res = await pool.query(query, [
            nama_mitra, 
            kategori, 
            gambar_url, 
            link_tujuan, 
            posisi_iklan, 
            status_bayar,
            tanggal_berakhir,
            id
        ]);
        return res.rows[0];
    },

    delete: async (id) => {
        await pool.query('DELETE FROM MitraBrosurs WHERE id=$1', [id]);
        return { message: 'Brosur deleted' };
    }
};

export default Brosur;