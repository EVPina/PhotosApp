import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { albumsApi } from '../../../api/albumsApi';
import type { Album } from '../../../types/album';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (album: Album) => void;
}

export function CreateAlbumModal({ open, onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const album = await albumsApi.create({ title, description });
      toast.success('¡Álbum creado!');
      onCreated(album);
      setTitle('');
      setDescription('');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al crear álbum');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Nuevo álbum">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Título del álbum"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={50}
        />
        <Input
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={loading}>
            Crear
          </Button>
        </div>
      </form>
    </Modal>
  );
}