import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { PhotoDto } from "../dtos/photo.dto";

export class Application_GetAlbumPhotos {
    constructor(private AlbumRepository: IAlbumRepository, private photoRepository: IPhotoRepository) {}
    async execute(albumId: string, userId: string): Promise<PhotoDto[]> {
    // 1. Verificar que el álbum existe y pertenece al usuario
    const album = await this.AlbumRepository.findAlbumById(albumId);
    if (!album || album.userId !== userId) {
      throw new Error('Album not found');
    }

    // 2. Devolver las fotos
    return this.photoRepository.findPhotoByAlbumId(albumId);
  }
}