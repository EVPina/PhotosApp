import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Photo } from '../../../types/photo';

interface Props {
  photo: Photo;
  index: number;
  onClick: () => void;
  onDelete: () => void;
}

export function PhotoCard({ photo, index, onClick, onDelete }: Props) {
  return (
    <motion.div
      className="relative group rounded-2xl overflow-hidden cursor-pointer aspect-square bg-white/5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <img
        src={photo.urlImage}
        alt={photo.originalName}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/80 backdrop-blur text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition"
      >
        <Trash2 size={16} />
      </button>
      <p className="absolute bottom-3 left-3 right-3 text-xs text-white truncate opacity-0 group-hover:opacity-100 transition">
        {photo.originalName}
      </p>
    </motion.div>
  );
}