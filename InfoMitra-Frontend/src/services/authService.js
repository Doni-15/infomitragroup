import api from '../config/api.js';

const AUTH_API_BASE = '/auth/'; 

export const authService = {
    login: async (email, password) => {
        const response = await api.post(`${AUTH_API_BASE}login`, { email, password });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
    },

    register: async (userData) => {
        const response = await api.post(`${AUTH_API_BASE}register`, userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (error) {
                console.error("Data user di storage rusak, mereset session.");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
    }
};