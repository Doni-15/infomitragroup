import api from '../config/api';

const TESTIMONI_API = '/testimoni'; 

export const testimoniService = {
    getPublic: async () => {
        const response = await api.get(TESTIMONI_API);
        return response.data;
    },

    getAllAdmin: async () => {
        const response = await api.get(`${TESTIMONI_API}/admin`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(TESTIMONI_API, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`${TESTIMONI_API}/${id}`);
        return response.data;
    }
};