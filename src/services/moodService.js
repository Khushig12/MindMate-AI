import api from './api';

export const moodService = {
  getAll: async () => {
    const response = await api.get('/mood/all');
    return response.data;
  },

  save: async (data) => {
    const response = await api.post('/mood/save', data);
    return response.data;
  },
};

export default moodService;
