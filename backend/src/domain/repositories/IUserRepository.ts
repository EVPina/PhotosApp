import {User} from '../entities/User'

export interface UserRepository {
    findUserById(user_id:String):Promise<User|null>
    findUserByEmail(email:String):Promise<User | null>
    create(userData:Object):Promise<User>
    update(userData:Object):Promise<User>
}