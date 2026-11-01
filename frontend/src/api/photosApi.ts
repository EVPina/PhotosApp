import api from './client';
import type { Photo } from '../types/photo';

export const photosApi = {
  async getByAlbum(albumId: string): Promise<Photo[]> {
    const res = await api.get(`/albums/${albumId}/photos`);
    return res.data;
  },

  async getById(id: string): Promise<Photo> {
    const res = await api.get(`/albums/photos/${id}`);
    return res.data;
  },

  async upload(albumId: string, file: File, onProgress?: (percent: number) => void): Promise<Photo> {
    const formData = new FormData();
    formData.append('photo', file);

    const res = await api.post(`/albums/${albumId}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total && onProgress) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/albums/photos/${id}`);
  },
};