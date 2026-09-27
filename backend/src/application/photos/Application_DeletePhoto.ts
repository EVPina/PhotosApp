import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { IStorageService } from "../ports/IStorageService";


export class Application_DeletePhoto {
    constructor(private photoRepository: IPhotoRepository,private albumRepository: IAlbumRepository,private storageService: IStorageService) {}

    async execute(photoId: string, userId: string): Promise<void> {
    // 1. Buscar la foto
    const photo = await this.photoRepository.findPhotoById(photoId);
    if (!photo) throw new Error('Photo not found');

    // 2. Verificar propiedad a través del álbum
    const album = await this.albumRepository.findAlbumById(photo.albumId);
    if (!album || album.userId !== userId) {
      throw new Error('Photo not found');
    }

    // 3. Eliminar de Cloudinary
    await this.storageService.deleteFile(photo.publicId);

    // 4. Eliminar de BD
    await this.photoRepository.deletePhoto(photoId);
  }

}