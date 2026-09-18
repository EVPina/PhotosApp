import { User } from "../../domain/entities/User";
import { AlbumLimitReachedError } from "../../domain/errors/AlbumLimitReachedError";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateAlbumDto } from "../dtos/album.dto";

export class Application_CreateAlbum{
    constructor(private albumRepository:IAlbumRepository, private userRepository:IUserRepository) {
    }

    async execute( userId: string, title: string, description: string | null ) {
        const userDto  = await this.userRepository.findUserById(userId);
        if (!userDto) {
            throw new Error("No se encontro el usuario");
        }

        const countalbums = await this.albumRepository.countByUserId(userId);
        const user = new User(
           { id : userDto.id,
             email: userDto.email,
             name: userDto.name ?? undefined,
            passwordHash:  userDto.passwordHash,
            createdAt: userDto.createdAt,
            updatedAt: userDto.updatedAt ?? undefined}
            );

        if (!user.CanCreateAlbum(countalbums)) {
            throw new AlbumLimitReachedError();
        }

        const createData: CreateAlbumDto = { userId, title, description };        
        return this.albumRepository.createAlbum(createData);
    }
}
