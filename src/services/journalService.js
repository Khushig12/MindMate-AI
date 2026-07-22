import api from './api';

export const journalService = {
  getAll: async () => {
    const response = await api.get('/journal');
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/journal', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/journal/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/journal/${id}`);
    return response.data;
  },
};

export default journalService;
