import api from './client';
import type { Album, CreateAlbumDto } from '../types/album';

export const albumsApi = {
  async getAll(): Promise<Album[]> {
    const res = await api.get('/albums');
    return res.data;
  },

  async getById(id: string): Promise<Album> {
    const res = await api.get(`/albums/${id}`);
    return res.data;
  },

  async create(data: CreateAlbumDto): Promise<Album> {
    const res = await api.post('/albums', data);
    return res.data;
  },

  async update(id: string, changes: Partial<CreateAlbumDto>): Promise<Album> {
    const res = await api.patch(`/albums/${id}`, changes);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/albums/${id}`);
  },
};