class RefreshToken {
    constructor(token, userId, expiresAt) {
        this.token = token;
        this.userId = userId;
        this.expiresAt = expiresAt;
    }

    async isValid() {
        const currentTime = new Date();
        return currentTime < this.expiresAt;
    }   
}
module.exports = RefreshToken;