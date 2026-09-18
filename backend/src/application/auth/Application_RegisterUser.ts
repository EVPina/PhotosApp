import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { IHashService } from "../ports/IHashService";


export class AplicationRegisterUser {
    constructor(private prismauserRepository : PrismaUserRepository, private HashService : IHashService) {    }

    async execute({ email, name, password } : {email:string, name: string, password : string}) {
        const existingUser = await this.prismauserRepository.findByEmail(email);
        if(existingUser) {
            throw new Error("El correo ya existe");
        }
        const passwordHash = await this.HashService.HashPassword(password);
        return await this.prismauserRepository.create({ email, name , passwordHash  });
    }
}
