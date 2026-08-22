import AlbumRepository from "../../domain/repositories/AlbumRepository.js";
import Album from "../../domain/entities/Album.js";

class PrismaAlbumRepository extends AlbumRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }

    async findAlbumById(album_id) {
        const album = await this.prismaClient.album.findUnique({
            where: { id: album_id },
        });
        return new Album(album);
    }

    async CountUserAlbums(user_id) {
        const count = await this.prismaClient.album.count({
            where: { userId: user_id },
        });
        return count;
    }

    async createAlbum(albumData) {
        const album = await this.prismaClient.album.create({
            data: albumData,
        });
        return new Album(album);
    }

    async updateAlbum(album_id, albumData) {
        const album = await this.prismaClient.album.update({
            where: { id: album_id },
            data: albumData,
        });
        return new Album(album);
    }

    async deleteAlbum(album_id) {
        const album = await this.prismaClient.album.delete({
            where: { id: album_id },
        });
        return new Album(album);
    }
}