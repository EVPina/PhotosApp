import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import type { Album } from '../../../types/album';

const gradients = [
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-blue-500 to-cyan-500',
];

export function AlbumCard({ album, index }: { album: Album; index: number }) {
  const gradient = gradients[index % gradients.length];
  const count = album.photoCount ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/albums/${album.id}`} className="block group">
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