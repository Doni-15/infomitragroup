import { getAllPackages, updatePackageModel } from '../models/hargaIklanModel.js';

export const getPackages = async (req, res) => {
    try {
        const data = await getAllPackages();
        
        const formattedData = data.map(item => ({
            id: item.id,
            name: item.nama_paket,
            price: parseFloat(item.harga_dasar),
            label: item.badge_label || "",
            features: item.daftar_fitur || [],
            discounts: item.setting_diskon || []
        }));

        res.status(200).json(formattedData);
    } 
    catch (error) {
        res.status(500).json({ 
            message: "Server Error saat mengambil data" 
        });
    }
};

export const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, label, features, discounts } = req.body;

        const dataToUpdate = {
            nama_paket: name,
            harga_dasar: price,
            badge_label: label,
            daftar_fitur: features,
            setting_diskon: discounts
        };

        const updatedData = await updatePackageModel(id, dataToUpdate);

        if (!updatedData) {
            return res.status(404).json({ 
                message: "Paket tidak ditemukan" 
            });
        }

        res.status(200).json({ 
            message: "Paket berhasil diupdate", 
            data: updatedData 
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Gagal update paket" 
        });
    }
};