class UpdateAlbum{
    constructor(AlbumRepository){
        this.albumRepository = AlbumRepository;
    }

    async execute(albumId, albumData,changes){
        const existingAlbum = await this.albumRepository.findAlbumById(albumId);

        if( !existingAlbum ){
            throw new Error("Album not found");
        }

        const allowedChanges = {}
        if(changes.title !== undefined) allowedChanges.name =changes.title;
        if(changes.description !== undefined) allowedChanges.description = changes.description;
        return this.albumRepository.update(albumId, allowedChanges);
    }
}
module.exports = UpdateAlbum;