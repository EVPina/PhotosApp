import { Router } from 'express';
import { PhotoController } from '../../../interfaces/controller/PhotoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { uploadSingle } from '../middlewares/uploadParser';

export default (photoController: PhotoController): Router => {
  const router = Router();

  router.use(authMiddleware);

  /**
   * @swagger
   * /albums/{albumId}/photos:
   *   post:
   *     summary: Subir una foto a un álbum
   *     tags: [Photos]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: albumId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               photo:
   *                 type: string
   *                 format: binary
   *     responses:
   *       201:
   *         description: Foto subida correctamente
   *       400:
   *         description: Límite alcanzado o archivo inválido
   */
  router.post('/:albumId/photos', uploadSingle, photoController.uploadPhotoHandler.bind(photoController));

  /**
   * @swagger
   * /albums/{albumId}/photos:
   *   get:
   *     summary: Listar fotos de un álbum
   *     tags: [Photos]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: albumId
   *         required: true
   *         schema:
   *           type: string
   *           example: "8aabfb57-3a88-4a1d-80f6-6710856e8bbf"
   *     responses:
   *       200:
   *         description: Lista de fotos del álbum
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Photo'
   *       404:
   *         description: Álbum no encontrado
   */
  router.get('/:albumId/photos', photoController.getAlbumPhotosHandler.bind(photoController));

  /**
   * @swagger
   * /albums/photos/{id}:
   *   get:
   *     summary: Detalle de una foto
   *     tags: [Photos]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: "1e4257e2-624c-4630-a939-ff5a22a1d34e"
   *     responses:
   *       200:
   *         description: Detalle de la foto
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Photo'
   *       404:
   *         description: Foto no encontrada
   */
  router.get('/photos/:id', photoController.getPhotoDetailHandler.bind(photoController));

  /**
   * @swagger
   * /albums/photos/{id}:
   *   delete:
   *     summary: Eliminar una foto
   *     tags: [Photos]
   *     security:
   *       - cookieAuth: []
   *     parameters:
   *       - in: path
   *         name: id                          // ← debe ser "id"
   *         required: true
   *         schema:
   *           type: string
   */
  router.delete('/photos/:id', photoController.deletePhotoHandler.bind(photoController));

  return router;
};