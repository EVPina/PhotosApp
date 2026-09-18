import { CreateUserDto, UserDto } from '../../application/dtos/user.dto'

export interface IUserRepository {
    findUserById(id:String):Promise<UserDto|null>
    findByEmail(email:String):Promise<UserDto | null>
    create(userData:CreateUserDto):Promise<UserDto>
    update(userData:Object):Promise<UserDto>
}