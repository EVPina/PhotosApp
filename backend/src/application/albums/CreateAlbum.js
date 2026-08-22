import AlbumLimitReachedError from "../../domain/errors/AlbumLimitReachedError.js";

class CreateAlbum{
    constructor(albumRepository, userRepository) {
        this.albumRepository = albumRepository;
        this.userRepository = userRepository;
    }

    async execute({ userId, albumName, description }) {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new Error("No se encontro el usuario");
        }

        const countalbums = await this.albumRepository.CountUserAlbums(userId);
        if (user.CanCreateAlbum(countalbums)) {
            throw new AlbumLimitReachedError();
        }
        return this.albumRepository.createAlbum({ userId, albumName, description });
    }
}

module.exports = CreateAlbum;