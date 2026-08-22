import PhotoLimitReachedError from "../../domain/errors/PhotoLimitReachedError.js";

class UploadPhoto{
    constructor(PhotoRepository,AlbumRepository , storageService){
        this.PhotoRepository = PhotoRepository;
        this.AlbumRepository = AlbumRepository;
        this.storageService = storageService;
    }

    async execute(photoData){
        const album = await this.AlbumRepository.findAlbumById(photoData.album_id);

        if( !album ){
            throw new Error("No se encontro Album");
        }

        const photocount = await this.AlbumRepository.CountAlbumPhotos(photoData.album_id);
        if(album.CanUploadPhoto(photocount)){
            throw new PhotoLimitReachedError();
        }

        const uploadResult = await this.storageService.uploadFile(photoData.file);
        if(!uploadResult) 
            throw new Error("Error al subir la foto");
                
        return this.PhotoRepository.create({ ...photoData, ...uploadResult });
    }
}