import { Photo } from "../entities/Photo"

export interface PhotoRepository {
    findPhotoById(photo_id:String):Promise<Photo | null>
    findPhotoByAlbumId(album_id:String):Promise<Photo | null>
    create(photoData:Object):Promise<Photo>
    update(photo_id:String, photoData:Object):Promise<Photo>
    delete(photo_id:String):Promise<Photo>
}