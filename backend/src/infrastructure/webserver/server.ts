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

// Controladores
import { AuthController } from '../../interfaces/controller/AuthController';

// Rutas
import authRoutes from './routes/authRoutes';
import { Application_RefreshToken } from '../../application/auth/Application_RefreshToken';
import { errorHandler } from './middlewares/errorHandler';

// 1. Instanciar repositorios
const userRepository = new PrismaUserRepository();

// 2. Instanciar servicios
const hashService = new BcryptHashService();
const tokenService = new JwTokenService();

// 3. Instanciar casos de uso
const registerUser = new AplicationRegisterUser(userRepository, hashService);
const loginUser = new Application_LoginUser(userRepository, hashService, tokenService);
const refreshToken = new Application_RefreshToken(tokenService, userRepository);

// 4. Instanciar controladores
const authController = new AuthController(registerUser, loginUser, refreshToken);

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