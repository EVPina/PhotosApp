import { Album } from "@prisma/client"
import { AlbumDto, UpdateAlbumDto } from "../../application/dtos/album.dto"

export interface IAlbumRepository {
    findAlbumById(album_id: string): Promise<AlbumDto[] | null>
    findByUserId(userId: string): Promise<AlbumDto[] | null> 
    countByUserId(userId: string): Promise<number>
    createAlbum(albumData:Object) : Promise<AlbumDto>
    updateAlbum(album_id: string, changes: UpdateAlbumDto): Promise<AlbumDto>
    deleteAlbum(album_id: string):  Promise<void>
}
