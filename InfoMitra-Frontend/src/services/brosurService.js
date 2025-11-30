import api from '../config/api';

const BROSUR_API = '/brosur'; 

export const brosurService = {
    getVip: async () => {
        const response = await api.get(`${BROSUR_API}/vip`);
        return response.data;
    },

    getGrid: async () => {
        const response = await api.get(`${BROSUR_API}/grid`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`${BROSUR_API}/${id}`);
        return response.data;
    },

    getMyBrosurs: async () => {
        const response = await api.get(`${BROSUR_API}/my`);
        return response.data;
    },

    getAllAdmin: async () => {
        const response = await api.get(`${BROSUR_API}/admin/all`);
        return response.data;
    },

    create: async (formData) => {
        const response = await api.post(`${BROSUR_API}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id, formData) => {
        const response = await api.put(`${BROSUR_API}/${id}`, formData);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`${BROSUR_API}/${id}`);
        return response.data;
    }
};