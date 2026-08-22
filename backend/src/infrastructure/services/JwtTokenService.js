import jwt from 'jsonwebtoken';
import TokenService from './TokenService';
import config from '../../config';

class JwTokenService extends TokenService {
    generateToken(payload) {
        return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn });
    }
    veryfyToken(token) {
        return jwt.verify(token, config.jwtSecret);
    }
    verifyRefreshToken(token) {
        return jwt.verify(token, config.jwtRefreshSecret);
    }
}

module.exports = JwTokenService;