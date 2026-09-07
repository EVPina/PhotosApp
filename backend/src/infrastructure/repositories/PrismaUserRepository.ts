import { plainToInstance } from "class-transformer";
import { CreateUserDto, UserDto } from "../../application/dtos/user.dto";
import { User } from "../../domain/entities/User";
import prisma from "../database/prismaClient";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {

    async findUserById(id: string): Promise<UserDto | null> {
        const user = await prisma.user.findUnique({ where: {id} });
        return user ? new User({ id: user.id, email: user.email, passwordHash: user.passwordHash, createdAt: user.createdAt, updatedAt: user.updatedAt ?? undefined }) : null;
    }
    async findByEmail(email: string): Promise<UserDto | null> {
        const prismaUser = await prisma.user.findUnique({ where: { email } });
        return prismaUser ? plainToInstance(UserDto, prismaUser) : null;
    }

    async create(userData: CreateUserDto): Promise<UserDto> {
        const nuevo_user = await prisma.user.create({data:userData});
            return plainToInstance(UserDto,nuevo_user);

    }   
    update(userData: Object): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
}

