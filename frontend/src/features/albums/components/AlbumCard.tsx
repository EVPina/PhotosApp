import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Sparkles, Trash2 } from 'lucide-react';
import type { Album } from '../../../types/album';

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-blue-500 to-cyan-500',
];

// 👇 Añadimos onDelete a las props
interface Props {
  album: Album;
  index: number;
  onDelete: (id: string) => void; 
}

export function AlbumCard({ album, index, onDelete }: Props) {
  const gradient = gradients[index % gradients.length];
  const count = album.photoCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="relative group" // Añadimos relative y group aquí
    >
      {/* Botón de eliminar (aparece al pasar el ratón) */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Evita que nos lleve al Link
          e.stopPropagation(); // Detiene la propagación del evento
          onDelete(album.id);
        }}
        className="absolute top-3 left-3 z-10 p-2 rounded-lg bg-red-500/80 backdrop-blur text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
        title="Eliminar álbum"
      >
        <Trash2 size={16} />
      </button>

      <Link to={`/albums/${album.id}`} className="block">
        <div className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 transition-all">
          <div className={`h-40 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}>
            <ImageIcon size={48} className="text-white/80" />
            <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-xs font-semibold">
              {count}/20
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg truncate group-hover:text-indigo-300 transition">
              {album.title}
            </h3>
            {album.description && (
              <p className="text-sm text-white/60 mt-1 line-clamp-2">{album.description}</p>
            )}
            <div className="flex items-center gap-1 text-xs text-white/40 mt-3">
              <Sparkles size={12} />
              <span>{new Date(album.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}