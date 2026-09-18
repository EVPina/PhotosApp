import 'reflect-metadata';

import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from '../config/development';
import { setupSwagger } from './swagger';

// Repositorios
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';

// Servicios
import { BcryptHashService } from '../services/BcryptHashService';
import { JwTokenService } from '../services/JwtTokenService';

// Casos de uso
import { Application_LoginUser } from '../../application/auth/Application_LoginUser';
import { AplicationRegisterUser } from '../../application/auth/Application_RegisterUser';
import { Application_GetUserAlbums } from '../../application/albums/Application_GetUserAlbums';
import { Application_CreateAlbum } from '../../application/albums/Application_CreateAlbum';
import { Application_UpdateAlbum } from '../../application/albums/Application_UpdateAlbum';
import { Application_DeleteAlbum } from '../../application/albums/Application_DeleteAlbum';

// Controladores
import { AuthController } from '../../interfaces/controller/AuthController';

// Rutas
import authRoutes from './routes/authRoutes';
import { Application_RefreshToken } from '../../application/auth/Application_RefreshToken';
import { errorHandler } from './middlewares/errorHandler';
import { AlbumController } from '../../interfaces/controller/AlbumController';
import { PrismaAlbumRepository } from '../repositories/PrismaAlbumRepository';
import { PrismaPhotoRepository } from '../repositories/PrismaPhotoRepository';
import { CloudinaryStorageService } from '../services/CloudinaryStorageService';
import albumRoutes from './routes/albumRoutes';

// 1. Instanciar repositorios
const userRepository = new PrismaUserRepository();
const albumRepository = new PrismaAlbumRepository();
const photoRepository = new PrismaPhotoRepository();

// 2. Instanciar servicios
const hashService = new BcryptHashService();
const tokenService = new JwTokenService();
const storageService = new CloudinaryStorageService();

// 3. Instanciar casos de use
const registerUser = new AplicationRegisterUser(userRepository, hashService);
const loginUser = new Application_LoginUser(userRepository, hashService, tokenService);
const refreshToken = new Application_RefreshToken(tokenService, userRepository);

const getUserAlbum = new Application_GetUserAlbums(albumRepository);
const createAlbum = new Application_CreateAlbum(albumRepository, userRepository);
const deleteAlbum = new Application_DeleteAlbum(albumRepository,storageService,photoRepository);
const updateAlbum = new Application_UpdateAlbum(albumRepository);


// 4. Instanciar controladores
const authController = new AuthController(registerUser, loginUser, refreshToken);
const albumController = new AlbumController(createAlbum, getUserAlbum, updateAlbum, deleteAlbum);

// 5. Crear aplicación Express
const app: Application = express();

setupSwagger(app);

// 6. Middlewares globales
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 7. Montar rutas
app.use('/api/auth', authRoutes(authController));
app.use('/api/albums', albumRoutes(albumController));

// Middleware de manejo de errores (SIEMPRE AL FINAL)
app.use(errorHandler);

// 9. Exportar app para pruebas
export { app };

// 10. Iniciar servidor solo si no es entorno de prueba
if (process.env.NODE_ENV !== 'test') {
  const port = config.port;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}