import Testimoni from '../models/komentarModel.js';

export const getPublicTestimonis = async (req, res) => {
    try {
        const data = await Testimoni.getForPublic();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ 
            msg: "Gagal mengambil data testimoni" 
        });
    }
};

export const getAdminTestimonis = async (req, res) => {
    try {
        const data = await Testimoni.getAllForAdmin();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ 
            msg: "Gagal mengambil data testimoni admin" 
        });
    }
};

export const createTestimoni = async (req, res) => {
    try {
        const { isi_text, rating } = req.body;
        
        const userId = req.userId; 

        if (!isi_text || !rating) {
            return res.status(400).json({ 
                msg: "Mohon lengkapi ulasan dan rating." 
            });
        }

        const ratingNum = parseInt(rating);
        if (ratingNum < 1 || ratingNum > 5) {
            return res.status(400).json({ 
                msg: "Rating harus antara 1 sampai 5 bintang." 
            });
        }

        const newTestimoni = await Testimoni.create(userId, isi_text, ratingNum);
        
        res.status(201).json({ 
            msg: "Terima kasih! Ulasan Anda berhasil dikirim.", 
            data: newTestimoni 
        });

    } 
    catch (error) {
        res.status(500).json({ 
            msg: "Gagal mengirim ulasan"
        });
    }
};

export const deleteTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const target = await Testimoni.getById(id);
        
        if (!target) {
            return res.status(404).json({ 
                msg: 'Testimoni tidak ditemukan' 
            });
        }

        const currentUserId = req.userId;
        const isOwner = target.user_id === currentUserId;
        
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ 
                msg: 'Akses Ditolak. Anda tidak berhak menghapus ulasan ini.' 
            });
        }

        await Testimoni.delete(id);

        res.json({ 
            msg: "Ulasan berhasil dihapus." 
        });

    } 
    catch (error) {
        res.status(500).json({ 
            msg: "Gagal menghapus ulasan" 
        });
    }
};