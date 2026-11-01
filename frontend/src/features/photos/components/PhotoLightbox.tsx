import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Photo } from '../../../types/photo';

interface Props {
  photo: Photo | null;
  onClose: () => void;
}

export function PhotoLightbox({ photo, onClose }: Props) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute top-6 right-6 p-3 rounded-full glass hover:bg-white/20 transition"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <motion.img
            src={photo.urlImage}
            alt={photo.originalName}
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-3 text-sm text-white/80">
            {photo.originalName} · {(photo.sizeBytes / 1024).toFixed(1)} KB
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}