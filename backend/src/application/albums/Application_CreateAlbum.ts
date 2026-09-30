import { User } from "../../domain/entities/User";
import { AlbumLimitReachedError } from "../../domain/errors/AlbumLimitReachedError";
import { AlbumTitleAlreadyExistsError } from "../../domain/errors/AlbumTitleAlreadyExistsError";
import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { slugify } from "../../shared/utils/slugify";
import { CreateAlbumDto } from "../dtos/album.dto";
import { IStorageService } from "../ports/IStorageService";

export class Application_CreateAlbum{
    constructor(private albumRepository:IAlbumRepository, private userRepository:IUserRepository,private storageService: IStorageService) {
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

        const exists = await this.albumRepository.existsByUserIdAndTitle(userId, title);
        if (exists) 
            throw new AlbumTitleAlreadyExistsError();

        const userName = (userDto.name || userDto.email.split('@')[0] || 'user').trim();
        const userFolder = `${slugify(userName)}_${userId}`;
        const albumFolderName = slugify(title);
        const albumFolderPath = `${userFolder}/${albumFolderName}`;

        await this.storageService.createFolderIfNotExists(userFolder);

        await this.storageService.createFolderIfNotExists(albumFolderPath);

        const createData: CreateAlbumDto = { userId, title, description,folder: albumFolderPath };        
        return this.albumRepository.createAlbum(createData);
    }
}
