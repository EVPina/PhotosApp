import jwt from 'jsonwebtoken';
import {ITokenService} from '../../application/ports/ITokenService';
import Config_Development from '../config/development';

export class JwTokenService implements ITokenService {
    generateToken(payload:object) : String {
        return jwt.sign(payload, Config_Development.jwtSecret, { expiresIn: Config_Development.jwtExpiresIn });
    }

    refreshToken(payload:object):String {
        return jwt.sign(payload, Config_Development.jwtRefreshSecret, { expiresIn: Config_Development.jwtRefreshExpiresIn });
    }
    verifyToken(token:string): string | jwt.JwtPayload  {
        return jwt.verify(token, Config_Development.jwtSecret);
    }
    verifyRefreshToken(token:string): string | jwt.JwtPayload {
        return jwt.verify(token, Config_Development.jwtRefreshSecret);
    }
}