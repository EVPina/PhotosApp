// frontend/src/features/albums/pages/AlbumsPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FolderOpen } from 'lucide-react';
import toast from 'react-hot-toast'; // 👈 Importa toast
import { Button } from '../../../components/ui/Button';
import { Spinner } from '../../../components/ui/Spinner';
import { AlbumCard } from '../components/AlbumCard';
import { CreateAlbumModal } from '../components/CreateAlbumModal';
import { useAlbums } from '../hooks/useAlbums';
import { albumsApi } from '../../../api/albumsApi'; // 👈 Importa la API

export function AlbumsPage() {
  const { albums, loading, refresh } = useAlbums();
  const [modalOpen, setModalOpen] = useState(false);

  const canCreate = albums.length < 5;

  // 👇 Nueva función para eliminar
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este álbum y todas sus fotos?')) {
      return;
    }

    try {
      await albumsApi.delete(id);
      toast.success('Álbum eliminado correctamente');
      refresh(); // Recarga la lista
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar el álbum');
    }
  };

  return (
    <div>
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Mis álbumes
          </h1>
          <p className="text-white/60 mt-1">
            {albums.length}/5 compartimientos · {albums.reduce((acc, a) => acc + (a.photoCount ?? 0), 0)} fotos
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          disabled={!canCreate}
          size="lg"
        >
          <Plus size={18} />
          Nuevo álbum
        </Button>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : albums.length === 0 ? (
        <motion.div
          className="glass rounded-3xl p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FolderOpen size={64} className="mx-auto text-white/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Aún no tienes álbumes</h2>
          <p className="text-white/60 mb-6">
            Crea tu primer compartimiento para empezar a guardar fotos
          </p>
          <Button onClick={() => setModalOpen(true)} size="lg">
            <Plus size={18} />
            Crear mi primer álbum
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album, i) => (
            <AlbumCard 
              key={album.id} 
              album={album} 
              index={i} 
              onDelete={handleDelete} // 👈 Le pasamos la función
            />
          ))}
        </div>
      )}

      <CreateAlbumModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={() => refresh()}
      />
    </div>
  );
}