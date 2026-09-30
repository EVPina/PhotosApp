import { plainToInstance } from "class-transformer";
import { AlbumDto, CreateAlbumDto, UpdateAlbumDto } from "../../application/dtos/album.dto";
import { Album } from "../../domain/entities/Album";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import prisma from "../database/prismaClient";

export class PrismaAlbumRepository implements IAlbumRepository {
 
    async findAlbumById(album_id: string): Promise<AlbumDto | null> {

        const album = await prisma.album.findUnique({
            where: { id: album_id },
            include: { _count: { select: { Photo: true } } },
        });
        
        if (!album  ) return null;

        return plainToInstance(AlbumDto, {
            ...album,
            photoCount: album._count.Photo,
        });
    }

    async findByUserId(userId: string): Promise<AlbumDto[]> {
        console.log("Finding albums for userId:", userId); // Debugging line

        const albums = await prisma.album.findMany({
            where: { userId },
            include: { _count: { select: { Photo: true } } },
            orderBy: { createdAt: 'desc' }
        });

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
    
    // PrismaAlbumRepository
    async countByAlbumId(albumId: string): Promise<number> {
        return prisma.photo.count({ where: { albumId } });
    }

    async createAlbum(albumData: CreateAlbumDto) : Promise<AlbumDto>{
        const album = await prisma.album.create({ data: {
            userId: albumData.userId,
            title: albumData.title,
            description: albumData.description ?? null,
            folder: albumData.folder,
        } });
        return plainToInstance(AlbumDto, album);
    }

    async updateAlbum(album_id: string, changes: UpdateAlbumDto): Promise<AlbumDto> {
        const album = await prisma.album.update({ where: { id: album_id }, data: changes });
        return plainToInstance(AlbumDto, album);
    }

    async deleteAlbum(album_id: string):  Promise<void>{
          await prisma.album.delete({ where: { id: album_id } });
    }

    async existsByUserIdAndTitle(userId: string, title: string): Promise<boolean> {
        const count = await prisma.album.count({
            where: { userId, title },
        });
        return count > 0;
    }
}