import PrismaRepository from "./PrismaRepository.js";
import Photo from "../../domain/entities/Photo.js";

class PrismaPhotoRepository extends PrismaRepository {

    async create(photo) {
        const createdPhoto = await this.prisma.photo.create({
            data: {
                ...photo,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return new Photo(createdPhoto);
    }

}