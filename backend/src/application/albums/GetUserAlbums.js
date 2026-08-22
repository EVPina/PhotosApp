class GetUserAlbums{
    constructor(AlbumRepositoy){
        this.AlbumRepositoy = AlbumRepositoy;
    }

    async execute(userId){
        return this.AlbumRepositoy.getAlbumsByUserId(userId);
    }
}

module.exports = GetUserAlbums;