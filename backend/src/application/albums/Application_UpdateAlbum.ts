import { IAlbumRepository } from "../../domain/repositories/IAlbumRepository";
import { UpdateAlbumDto } from "../dtos/album.dto";

export class Application_UpdateAlbum{
    constructor(private albumRepository: IAlbumRepository){
    }

    async execute(albumId: string, albumData: any, changes: any){
        const existingAlbum = await this.albumRepository.findAlbumById(albumId);

        if( !existingAlbum ){
            throw new Error("Album not found");
        }

        const allowedChanges : UpdateAlbumDto  = {}
            if(changes.title !== undefined) allowedChanges.title = changes.title;
            if(changes.description !== undefined) allowedChanges.description = changes.description;
        return this.albumRepository.updateAlbum(albumId, allowedChanges);
    }
}