import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { IStorageService } from "../ports/IStorageService";

export class Application_DeleteAlbum{
    constructor(private AlbumRepository: IAlbumRepository, private storageService: IStorageService, private photoRepository: IPhotoRepository){
    }

    async execute(albumId: string,userId: string): Promise<void> {
        const existingAlbum = await this.AlbumRepository.findAlbumById(albumId);

        if( !existingAlbum){
            throw new Error("No se encuentra Album");
        }
        
        const photos = await this.photoRepository.findPhotoByAlbumId(albumId);

        await Promise.all(photos.map(async (photo:any) => {await this.storageService.deleteFile(photo.publicId);}));

        return this.AlbumRepository.deleteAlbum(albumId);
    }

}