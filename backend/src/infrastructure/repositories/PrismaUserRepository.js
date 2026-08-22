import UserRepository from "../../domain/repositories/UserRepository.js";
import User from "../../domain/entities/User.js";

class PrismaUserRepository extends UserRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }

    async findUserById(userId) {
        const user = await this.prismaClient.user.findUnique({
            where: { id: userId },
        });
        return new User(user);
    }

    async findUserByEmail(email) {
        const user = await this.prismaClient.user.findUnique({
            where: { email: email },
        });
        return new User(user);
    }

    async createUser(userData) {
        const user = await this.prismaClient.user.create({
            data: userData,
        });
        return new User(user);
    }
}

module.exports = PrismaUserRepository;