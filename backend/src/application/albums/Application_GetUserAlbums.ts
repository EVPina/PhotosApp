import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";

export class Application_GetUserAlbums{
    constructor(private AlbumRepository: IAlbumRepository){
    }

    async execute(userId:string){
        
        return this.AlbumRepository.findByUserId(userId);
    }
}
