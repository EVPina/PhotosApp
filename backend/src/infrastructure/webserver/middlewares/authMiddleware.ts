import { Request, Response, NextFunction } from 'express';
import { JwTokenService } from '../../services/JwtTokenService';
import { TokenExpiredError } from 'jsonwebtoken';

// Instanciar el servicio de tokens (o importar la instancia si ya existe)
const tokenService = new JwTokenService();

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Obtener access token de la cookie (o del header Authorization como fallback)
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // Verificar el token y extraer payload
    const payload = tokenService.verifyToken(token) as { userId: string };
    // Agregar userId al request para uso posterior
    req.userId = payload.userId;
    next();
  } catch (error) {
     if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}