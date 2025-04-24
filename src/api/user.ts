import { api } from './api';

export const userService = {
  me: async (): Promise<any> => {
    const response = await api.get('/me');
    return response.data;
  },
};
