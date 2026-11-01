import api from './client';
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const authApi = {
  async register(data: RegisterCredentials): Promise<User> {
    const res = await api.post('/auth/register', data);
    return res.data.user;
  },

  async login(data: LoginCredentials): Promise<User> {
    const res = await api.post('/auth/login', data);
    return res.data.user;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async me(): Promise<User | null> {
    try {
      // Intenta refrescar silenciosamente para recuperar sesión
      await api.post('/auth/refresh');
      // El backend podría no exponer /me, así que el user viene del estado local
      return null;
    } catch {
      return null;
    }
  },
};