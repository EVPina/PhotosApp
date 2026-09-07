import {Album} from '../entities/Album';

export interface IAlbumRepository {
    findAlbumById(album_id:String): Promise<Album | null> 
    CountUserAlbums(user_id:String) : boolean
    create(albumData:Object) : Promise<Album>
    update(albumData:Object) : Promise<Album>
    delete(album_id:String) : boolean
}
