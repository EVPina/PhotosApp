import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Spinner } from '../../../components/ui/Spinner';
import { Button } from '../../../components/ui/Button';
import { PhotoCard } from '../../photos/components/PhotoCard';
import { UploadPhotoButton } from '../../photos/components/UploadPhotoButton';
import { PhotoLightbox } from '../../photos/components/PhotoLightbox';
import { usePhotos } from '../../photos/hooks/usePhotos';
import { photosApi } from '../../../api/photosApi';
import type { Photo } from '../../../types/photo';

export function AlbumDetailPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();
  const { photos, loading, refresh } = usePhotos(albumId!);
  const [selected, setSelected] = useState<Photo | null>(null);

  const handleDelete = async (photo: Photo) => {
    if (!confirm(`¿Eliminar "${photo.originalName}"?`)) return;
    try {
      await photosApi.delete(photo.id);
      toast.success('Foto eliminada');
      refresh();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  const limitReached = photos.length >= 20;

  return (
    <div>
      <motion.div
        className="flex items-center justify-between mb-8 flex-wrap gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Fotos del álbum</h1>
            <p className="text-white/60 text-sm">
              {photos.length}/20 fotos
            </p>
          </div>
        </div>

        <UploadPhotoButton
          albumId={albumId!}
          onUploaded={refresh}
          disabled={limitReached}
        />
      </motion.div>

      {loading ? (
        <Spinner />
      ) : photos.length === 0 ? (
        <motion.div
          className="glass rounded-3xl p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ImageIcon size={64} className="mx-auto text-white/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Álbum vacío</h2>
          <p className="text-white/60 mb-6">
            Sube tus primeras fotos para empezar
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={() => setSelected(photo)}
              onDelete={() => handleDelete(photo)}
            />
          ))}
        </div>
      )}

      <PhotoLightbox photo={selected} onClose={() => setSelected(null)} />
    </div>
  );
}