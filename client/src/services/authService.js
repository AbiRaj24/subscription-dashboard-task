import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (refreshToken) => {
    const response = await api.post('/auth/logout', { refreshToken });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const planService = {
  getAllPlans: async () => {
    const response = await api.get('/plans');
    return response.data;
  },

  getPlanById: async (id) => {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  },
};

export const subscriptionService = {
  subscribe: async (planId) => {
    const response = await api.post(`/subscribe/${planId}`);
    return response.data;
  },

  getMySubscription: async () => {
    const response = await api.get('/my-subscription');
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.delete('/cancel');
    return response.data;
  },

  getAllSubscriptions: async () => {
    const response = await api.get('/admin/subscriptions');
    return response.data;
  },
};