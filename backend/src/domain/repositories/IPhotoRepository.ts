import { CreatePhotoDto, PhotoDto } from "../../application/dtos/photo.dto"

export interface IPhotoRepository {
    findPhotoById(photo_id:String):Promise<PhotoDto | null>
    findPhotoByAlbumId(album_id:String):Promise<PhotoDto[]>
    countByAlbumId(albumId: string): Promise<number>;
    createPhoto(photoData:CreatePhotoDto):Promise<PhotoDto>
    deletePhoto(photo_id:String):Promise<void>
}