import { useCallback, useEffect, useState } from 'react';
import { albumsApi } from '../../../api/albumsApi';
import type { Album } from '../../../types/album';
import toast from 'react-hot-toast';

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const data = await albumsApi.getAll();
      setAlbums(data);
    } catch {
      toast.error('No se pudieron cargar los álbumes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return { albums, loading, refresh: fetchAlbums };
}