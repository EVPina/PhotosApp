import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError, NotBeforeError } from 'jsonwebtoken';
// import { AlbumLimitReachedError } from '../../domain/errors/AlbumLimitReachedError';
// import { PhotoLimitReachedError } from '../../domain/errors/PhotoLimitReachedError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Errores de JWT
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: 'Token expired' });
  }
  if (err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Errores de dominio
//   if (err instanceof AlbumLimitReachedError || err instanceof PhotoLimitReachedError) {
//     return res.status(400).json({ message: err.message });
//   }

  // Errores comunes
  if (err.message === 'Email already in use') {
    return res.status(409).json({ message: err.message });
  }
  if (err.message === 'Invalid credentials') {
    return res.status(401).json({ message: err.message });
  }
  if (err.message === 'Album not found' || err.message === 'Photo not found') {
    return res.status(404).json({ message: err.message });
  }

  // Error por defecto
  return res.status(500).json({ message: 'Internal server error' });
}