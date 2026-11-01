import { useCallback, useEffect, useState } from 'react';
import { photosApi } from '../../../api/photosApi';
import type { Photo } from '../../../types/photo';
import toast from 'react-hot-toast';

export function usePhotos(albumId: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await photosApi.getByAlbum(albumId);
      setPhotos(data);
    } catch {
      toast.error('No se pudieron cargar las fotos');
    } finally {
      setLoading(false);
    }
  }, [albumId]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, refresh: fetchPhotos, setPhotos };
}