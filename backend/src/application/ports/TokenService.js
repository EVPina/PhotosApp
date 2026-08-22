class TokenService {
    async generateToken(payload,secret, expiresIn) {throw new Error('Method not implemented');    }
    async refreshToken(payload) {throw new Error('Method not implemented');    }
    async verifyToken(token) {throw new Error('Method not implemented');    }
    async verifyRefreshToken(token) {throw new Error('Method not implemented');    }
}

module.exports = TokenService;