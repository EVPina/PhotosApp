import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import { photosApi } from '../../../api/photosApi';

interface Props {
  albumId: string;
  onUploaded: () => void;
  disabled?: boolean;
}

export function UploadPhotoButton({ albumId, onUploaded, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await photosApi.upload(albumId, file, setProgress);
      }
      toast.success(`${files.length} foto(s) subida(s)`);
      onUploaded();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al subir');
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        onClick={() => inputRef.current?.click()}
        disabled={disabled || uploading}
        loading={uploading}
        size="lg"
      >
        <Upload size={18} />
        {uploading ? `Subiendo ${progress}%` : 'Subir fotos'}
      </Button>
    </>
  );
}