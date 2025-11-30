import api from '../config/api.js';

const HARGA_API_BASE = '/harga-iklan';

export const hargaIklanService = {
    getAllPackages: async () => {
        const response = await api.get(HARGA_API_BASE);
        return response.data;
    },

    updatePackage: async (id, packageData) => {
        const response = await api.put(`${HARGA_API_BASE}/${id}`, packageData);
        return response.data;
    }
};