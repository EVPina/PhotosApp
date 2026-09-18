import { PhotoLimitReachedError } from "../../domain/errors/PhotoLimitReachedError";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { PhotoDto } from "../dtos/photo.dto";
import { IStorageService } from "../ports/IStorageService";

export class UploadPhoto{
    constructor(private PhotoRepository: IPhotoRepository, private AlbumRepository: IAlbumRepository, private storageService: IStorageService){
    }

    async execute(photoData:PhotoDto):Promise<PhotoDto>{
        const album = await this.AlbumRepository.findAlbumById(photoData.albumId);

        if( !album ){
            throw new Error("No se encontro Album");
        }

        const photocount = await this.AlbumRepository.countByUserId(photoData.albumId);
        if(album.CanUploadPhoto(photocount)){
            throw new PhotoLimitReachedError("Se ha alcanzado el limite de fotos para este album");
        }

        const uploadResult = await this.storageService.uploadFile(photoData.);
        if(!uploadResult) 
            throw new Error("Error al subir la foto");
                
        return this.PhotoRepository.createPhoto({ ...photoData, ...uploadResult });
    }
}