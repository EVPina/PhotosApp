import { Router } from 'express';
import { AuthController } from '../../../interfaces/controller/AuthController';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */
export default (authController: AuthController): Router => {
  const router = Router();

    /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - name
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               name:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuario creado
   *       409:
   *         description: Email ya en uso
   */
  router.post('/register', authController.register.bind(authController));

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login exitoso, establece cookies
   *       401:
   *         description: Credenciales inválidas
   */
  router.post('/login', authController.login.bind(authController));

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Refrescar access token
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Token renovado
   *       401:
   *         description: Refresh token inválido o expirado
   */
  router.post('/refresh', authController.refresh.bind(authController));

    /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Cerrar sesión
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Sesión cerrada
   */
  router.post('/logout', authController.logout.bind(authController));

  return router;
};