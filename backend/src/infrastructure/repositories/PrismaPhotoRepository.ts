import { plainToInstance } from "class-transformer";
import { CreatePhotoDto, PhotoDto } from "../../application/dtos/photo.dto";
import { IPhotoRepository } from "../../domain/repositories/IPhotoRepository";
import prisma from "../database/prismaClient";

export class PrismaPhotoRepository implements IPhotoRepository {

    async findPhotoById(photo_id:string):Promise<PhotoDto | null> {
        const photo = await prisma.photo.findUnique({
            where: { id: photo_id },
        });
        if (!photo) return null;
        return photo ? plainToInstance(PhotoDto, photo) : null;
    }

    async findPhotoByAlbumId(album_id:string):Promise<PhotoDto[]> {
        const photos = await prisma.photo.findMany({
            where: { albumId: album_id },
            orderBy: { createdAt: 'desc' },
        });
        return photos.map((p) => plainToInstance(PhotoDto, p));
    }

    async createPhoto(photoData:CreatePhotoDto):Promise<PhotoDto> {
        const photo = await prisma.photo.create({ data: photoData });
        return plainToInstance(PhotoDto, photo);
    }

    async countByAlbumId(albumId: string): Promise<number> {
      return prisma.photo.count({ where: { albumId } });
    }

    async deletePhoto(photo_id:string):Promise<void> {
        await prisma.photo.delete({ where: { id: photo_id } });
    }
}