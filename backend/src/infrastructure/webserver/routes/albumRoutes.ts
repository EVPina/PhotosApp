import { Router } from 'express';
import { AlbumController } from '../../../interfaces/controller/AlbumController';
import { authMiddleware } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Manejo de Albums
 */
export default (albumController: AlbumController): Router => {
  const router = Router();

  // Todas las rutas de álbumes requieren autenticación
  router.use(authMiddleware);

  /**
   * @swagger
   * /albums:
   *   post:
   *     summary: Crear un nuevo álbum
   *     tags: [Albums]
   *     security:
   *       - cookieAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               userId:
   *                 type: string
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Álbum creado
   *       400:
   *         description: Límite de álbumes alcanzado
   */
  router.post('/', albumController.createAlbum.bind(albumController));

  /**
   * @swagger
   * /albums:
   *   get:
   *     summary: Obtener todos los álbumes del usuario
   *     tags: [Albums]
   *     security:
   *       - cookieAuth: []
   *     responses:
   *       200:
   *         description: Lista de álbumes
   */
  router.get('/', albumController.getAll.bind(albumController));

  /**
   * @swagger
   * /albums/{id}:
   *   patch:
   *     summary: Actualizar nombre/descripción de un álbum
   *     tags: [Albums]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Álbum actualizado
   *       404:
   *         description: Álbum no encontrado
   */
  router.patch('/:id', albumController.update.bind(albumController));

  /**
   * @swagger
   * /albums/{id}:
   *   delete:
   *     summary: Eliminar un álbum y sus fotos
   *     tags: [Albums]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Álbum eliminado
   *       404:
   *         description: Álbum no encontrado
   */
  router.delete('/:id', albumController.delete.bind(albumController));

  return router;
};