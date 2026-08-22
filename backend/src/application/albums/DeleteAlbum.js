class DeleteAlbum{
    constructor(AlbumRepository, storageService,photoRepository){
        this.AlbumRepository = AlbumRepository;
        this.storageService = storageService;
        this.photoRepository = photoRepository;
    }

    async execute(albumId){
        const existingAlbum = await this.AlbumRepository.findAlbumById(albumId);

        if( !existingAlbum ){
            throw new Error("No se encuentra Album");
        }
        
        const photos = await this.PhotoRepository.findPhotoByAlbumId(albumId);

        await Promise.all(photos.map(async (photo) => {await this.storageService.delete(photo.id);}));


        return this.AlbumRepository.delete(albumId);
    }

}

module.exports = DeleteAlbum;