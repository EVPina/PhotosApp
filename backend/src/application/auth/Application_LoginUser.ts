import Config_Development from "../../infrastructure/config/development";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { BcryptHashService } from "../../infrastructure/services/BcryptHashService";
import { ITokenService } from "../ports/ITokenService";

export class Application_LoginUser{
    constructor(private userRepository:PrismaUserRepository, private hashService: BcryptHashService, private tokenService:ITokenService) {
    }

    async execute({email,password}:{ email: string , password: string }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const isMatch = await this.hashService.ComparePassword(password, user.passwordHash);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }
        const token = await this.tokenService.generateToken({ userId: user.id });
        const refreshToken = await this.tokenService.refreshToken({ userId: user.id });
        return { user: { id: user.id, email: user.email }, token, refreshToken };
    }
}