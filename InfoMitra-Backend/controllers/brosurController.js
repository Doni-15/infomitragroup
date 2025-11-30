import Brosur from '../models/brosurModel.js';
import fs from 'fs';
import path from 'path';

export const getVipBrosurs = async (req, res) => {
    try {
        const brosur = await Brosur.getActiveByPosisi('brosur_vip');
        res.json(brosur);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getGridBrosurs = async (req, res) => {
    try {
        const brosur = await Brosur.getActiveByPosisi('grid');
        res.json(brosur);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAllBrosursAdmin = async (req, res) => {
    try {
        const brosur = await Brosur.getAll();
        res.json(brosur);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getBrosurById = async (req, res) => {
    try {
        const { id } = req.params;
        const brosur = await Brosur.getById(id);
        
        if (!brosur) {
            return res.status(404).json({ msg: "Brosur tidak ditemukan" });
        }
        res.json(brosur);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getMyBrosurs = async (req, res) => {
    try {
        const userId = req.userId; 
        
        if(!userId) return res.status(401).json({ msg: "Unauthorized" });

        const brosur = await Brosur.getByUserId(userId);
        res.json(brosur);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createBrosur = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "Harap upload gambar banner!" });
    }

    const { 
        email_user,
        nama_mitra, 
        kategori, 
        link_tujuan, 
        posisi_iklan, 
    } = req.body;

    const durasi_bulan = parseInt(req.body.durasi_bulan);

    if (!email_user) {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return res.status(400).json({ msg: "Email User pemilik brosur wajib diisi!" });
    }

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const gambar_url = `${protocol}://${host}/uploads/${req.file.filename}`;

    try {
        const newBrosur = await Brosur.create({ 
            email_user,
            nama_mitra, 
            kategori,
            gambar_url, 
            link_tujuan, 
            posisi_iklan, 
            durasi_bulan: parseInt(durasi_bulan) 
        });

        if (!newBrosur) {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.status(404).json({ msg: "Email user tidak ditemukan! Pastikan user sudah terdaftar." });
        }

        res.status(201).json({ 
            msg: "Brosur berhasil diterbitkan", 
            data: newBrosur 
        });

    } catch (error) {
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ msg: error.message });
    }
};

export const updateBrosur = async (req, res) => {
    const { id } = req.params;
    
    try {
        const oldData = await Brosur.getById(id);
        if (!oldData) {
            return res.status(404).json({ msg: "Brosur tidak ditemukan" });
        }

        let finalGambarUrl = oldData.gambar_url;

        if (req.file) {
            const protocol = req.headers['x-forwarded-proto'] || req.protocol;
            const host = req.get('host');

            finalGambarUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
            
            if(oldData.gambar_url) {
                const oldFileName = oldData.gambar_url.split('/').pop();
                const oldFilePath = path.join(process.cwd(), 'uploads', oldFileName);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
        }

        const { 
            nama_mitra, 
            kategori, 
            link_tujuan, 
            posisi_iklan, 
            status_bayar, 
            tanggal_berakhir 
        } = req.body;
        
        const updated = await Brosur.update(id, { 
            nama_mitra, 
            kategori,
            gambar_url: finalGambarUrl, 
            link_tujuan, 
            posisi_iklan,
            status_bayar,
            tanggal_berakhir
        });

        res.json({ 
            msg: "Data brosur berhasil diperbarui",
            data: updated 
        });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ msg: error.message });
    }
};

export const deleteBrosur = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Brosur.getById(id);
        if (!data) {
            return res.status(404).json({ msg: "Brosur tidak ditemukan" });
        }

        if(data.gambar_url) {
            const fileName = data.gambar_url.split('/').pop();
            const filePath = path.join(process.cwd(), 'uploads', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Brosur.delete(id);
        res.json({ msg: "Brosur berhasil dihapus permanen" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};