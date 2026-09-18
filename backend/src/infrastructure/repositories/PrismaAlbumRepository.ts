import { plainToInstance } from "class-transformer";
import { AlbumDto, UpdateAlbumDto } from "../../application/dtos/album.dto";
import { Album } from "../../domain/entities/Album";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import prisma from "../database/prismaClient";

export class PrismaAlbumRepository implements IAlbumRepository {
 
    async findAlbumById(album_id: string): Promise<AlbumDto[] | null> {

        const album = await prisma.album.findUnique({
            where: { id: album_id },
            include: { _count: { select: { Photo: true } } },
        });
        
        if (!album  ) return null;

        return [plainToInstance(AlbumDto, {
            ...album,
            photoCount: album._count.Photo,
        })];
    }

    async findByUserId(userId: string): Promise<AlbumDto[] | null> {
        console.log("Finding albums for userId:", userId); // Debugging line

        const albums = await prisma.album.findMany({
            where: { userId },
            include: { _count: { select: { Photo: true } } },
            orderBy: { createdAt: 'desc' }
        });
        if (!albums) return null;

        return albums.map((album) =>
            plainToInstance(AlbumDto, {
            ...album,
            photoCount: album._count.Photo,
            })
        );
    }

    async countByUserId(userId: string): Promise<number> {
        const count = await prisma.album.count({
            where: { userId: userId },
        });
        return count;
    }

    async createAlbum(albumData: any) : Promise<AlbumDto>{
        const album = await prisma.album.create({ data: albumData });
        return plainToInstance(AlbumDto, album);
    }

    async updateAlbum(album_id: string, changes: UpdateAlbumDto): Promise<AlbumDto> {
        const album = await prisma.album.update({ where: { id: album_id }, data: changes });
        return plainToInstance(AlbumDto, album);
    }

    async deleteAlbum(album_id: string):  Promise<void>{
          await prisma.album.delete({ where: { id: album_id } });
    }
}