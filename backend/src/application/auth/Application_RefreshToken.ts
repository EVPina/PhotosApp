import { IUserRepository } from '../../infrastructure/services/domain/repositories/IUserRepository';
import { ITokenService } from '../ports/ITokenService';

export class Application_RefreshToken {
  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: String }> {
    // 1. Verificar el refresh token y extraer userId
    const payload = this.tokenService.verifyRefreshToken(refreshToken) as { userId: string };

    // 2. Buscar al usuario en la base de datos
    const user = await this.userRepository.findUserById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 3. Generar un nuevo access token
    const accessToken = this.tokenService.generateToken({ userId: user.id });

    return { accessToken };
  }
}