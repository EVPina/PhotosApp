import { Album } from "../../domain/entities/Album";
import { PhotoLimitReachedError } from "../../domain/errors/PhotoLimitReachedError";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import { CreatePhotoDto, PhotoDto } from "../dtos/photo.dto";
import { IStorageService } from "../ports/IStorageService";

interface UploadPhotoInput {
  albumId: string;
  userId: string;
  fileBuffer: Buffer;
  originalName: string;
  mimeType: string;
}

export class Application_UploadPhoto{
    constructor(private PhotoRepository: IPhotoRepository, private AlbumRepository: IAlbumRepository, private storageService: IStorageService){
    }

    async execute(photoData:UploadPhotoInput):Promise<PhotoDto>{
        const albumdto = await this.AlbumRepository.findAlbumById(photoData.albumId);

        if( !albumdto ){
            throw new Error("No se encontro Album");
        }

        const album = new Album({
            id: albumdto.id,
            userId: albumdto.userId,
            title: albumdto.title,
            description: albumdto.description,
            createdAt: albumdto.createdAt,
            updatedAt: albumdto.updatedAt,
            photoCount: albumdto.photoCount,
        });
        
        const photocount = await this.AlbumRepository.countByUserId(photoData.albumId);
        if(album.canAddPhoto(photocount)){
            throw new PhotoLimitReachedError("Se ha alcanzado el limite de fotos para este album");
        }

        const uploadResult = await this.storageService.uploadFile(photoData.fileBuffer, {folder: `albums/${photoData.albumId}`});
        if(!uploadResult) 
            throw new Error("Error al subir la foto");

            const createData: CreatePhotoDto = {
                albumId: photoData.albumId,
                originalName: photoData.originalName,
                publicId: uploadResult.public_id,
                urlImage: uploadResult.secure_url,
                mimeType: photoData.mimeType,
                sizeBytes: uploadResult.bytes,
                width: uploadResult.width ?? null,
                height: uploadResult.height ?? null,
                }; 
                
        return this.PhotoRepository.createPhoto(createData);
    }
}