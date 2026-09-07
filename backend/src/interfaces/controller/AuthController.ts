import { AplicationRegisterUser } from "../../application/auth/Application_RegisterUser";
import { Application_LoginUser } from "../../application/auth/Application_LoginUser";
import { UserDto } from "../../application/dtos/user.dto";
import { Request, Response, NextFunction } from 'express';
import { JwTokenService } from "../../infrastructure/services/JwtTokenService";
import { Application_RefreshToken } from "../../application/auth/Application_RefreshToken";

export class AuthController {
    constructor(private registerUser: AplicationRegisterUser, private loginUser: Application_LoginUser,private jwttokenService: Application_RefreshToken) {
    }

    async register(req:Request, res:Response,next:NextFunction) : Promise<void> {
        try {
            const { email, name, password } = req.body;
            const user = await this.registerUser.execute({ email, name, password });

                    // Devolvemos solo datos seguros (sin passwordHash)
            const userResponse: Partial<UserDto> = {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
             res.status(201).json({ user: userResponse });
        } catch (error) {
            next(error);
        }
    }

    async login(req:Request, res:Response,next:NextFunction) : Promise<void> {
        try {
            const { email, password } = req.body;
            const {user, token, refreshToken} = await this.loginUser.execute({ email, password });
           
            res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'strict' , maxAge: 15*60*1000  });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/api/auth/refresh' , maxAge: 7*24*60*60*1000});
           
            res.status(200).json({ user: { id: user.id, email: user.email} });
        } catch (error) {
            next(error);
        }
    }

     async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) {
        res.status(401).json({ message: 'No refresh token provided' });
        return;
      }

      const { accessToken } = await this.jwttokenService.execute(token);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      res.json({ message: 'Token refreshed successfully' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(_req: Request, res: Response): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out successfully' });
  }
}