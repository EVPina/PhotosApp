import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { PhotoDto } from "../dtos/photo.dto";

export class Application_GetPhotoDetail {
    constructor(private photoRepository: IPhotoRepository, private albumRepository: IAlbumRepository) {}
    async execute(photoId: string, userId: string): Promise<PhotoDto> {
        // 1. Buscar la foto
        const photo = await this.photoRepository.findPhotoById(photoId);
        if (!photo) throw new Error('Photo not found');

        // 2. Verificar que el álbum pertenece al usuario
        const album = await this.albumRepository.findAlbumById(photo.albumId);
        if (!album || album.userId !== userId) {
        throw new Error('Photo not found');
        }

        return photo;
    }
}