import pool from '../config/db.js';

const Testimoni = {
    create: async (userId, isiText, rating) => {
        const query = `
            INSERT INTO Testimoni (user_id, isi_text, rating) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;

        const result = await pool.query(query, [userId, isiText, rating]);
        return result.rows[0];
    },

    getAllForAdmin: async () => {
        const query = `
            SELECT t.id, t.isi_text, t.rating, t.created_at, u.nama, u.email, u.role
            FROM Testimoni t
            JOIN Users u ON t.user_id = u.id
            ORDER BY t.created_at DESC
        `;

        const result = await pool.query(query);
        return result.rows;
    },

    getForPublic: async () => {
        const query = `
            SELECT t.id, t.isi_text, t.rating, t.created_at, u.nama
            FROM Testimoni t
            JOIN Users u ON t.user_id = u.id
            ORDER BY t.created_at DESC
        `;
        const result = await pool.query(query);
        return result.rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM Testimoni WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    checkByUser: async (userId) => {
        const result = await pool.query('SELECT * FROM Testimoni WHERE user_id = $1', [userId]);
        return result.rows.length > 0;
    },

    delete: async (id) => {
        const query = 'DELETE FROM Testimoni WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};

export default Testimoni;