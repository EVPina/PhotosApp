import { Request,Response,NextFunction } from "express";
import { Application_DeletePhoto } from "../../application/photos/Application_DeletePhoto";
import { Application_GetAlbumPhotos } from "../../application/photos/Application_GetAlbumPhotos";
import { Application_GetPhotoDetail } from "../../application/photos/Application_GetPhotoDetail";
import { Application_UploadPhoto } from "../../application/photos/Application_UploadPhoto";

export class PhotoController {
    constructor(private uploadPhoto: Application_UploadPhoto,private getAlbumPhotos: Application_GetAlbumPhotos,private getPhoto: Application_GetPhotoDetail, private deletePhoto: Application_DeletePhoto) {}

    async uploadPhotoHandler(req: Request, res: Response,next: NextFunction): Promise<void> {
        try {
            const albumId = req.params.albumId as string;
            const userId = req.userId!;
            const file = req.file;

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const photo = await this.uploadPhoto.execute({
                albumId,
                userId,
                fileBuffer: file.buffer,
                originalName: file.originalname,
                mimeType: file.mimetype
            });

            res.status(201).json(photo);
        } catch (error) {
            next("Error uploading photo:");
            res.status(500).json({ error: "Error uploading photo" });
        }
    }

    async getAlbumPhotosHandler(req: Request, res: Response,next: NextFunction): Promise<void> {
        try {
            const albumId = req.params.albumId as string;
            const userId = req.userId!;
            const photos = await this.getAlbumPhotos.execute(albumId, userId);
            res.status(200).json(photos);
        } catch (error) {
            next(error);
            res.status(500).json({ error: "Error fetching album photos" });
        }
    }

    async getPhotoDetailHandler(req: Request, res: Response,next: NextFunction): Promise<void> {
        try {
            const photoId = req.params.photoId as string;
            const userId = req.userId!;
            const photo = await this.getPhoto.execute(photoId, userId);
            res.status(200).json(photo);
        } catch (error) {
            next(error);
            res.status(500).json({ error: "Error fetching photo details" });
        }
    }

    async deletePhotoHandler(req: Request, res: Response,next: NextFunction): Promise<void> {
        try {
            const photoId = req.params.photoId as string;
            const userId = req.userId!;
            await this.deletePhoto.execute(photoId, userId);
            res.status(200).json({ message: "Photo deleted successfully" });
        } catch (error) {
            next(error);
            res.status(500).json({ error: "Error deleting photo" });
        }
    }
}