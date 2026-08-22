class AuthController {
    constructor(registerUser,loginUser,refreshToken) {
        this.registerUser = registerUser;
        this.loginUser = loginUser;
        this.refreshToken = refreshToken;
    }

    async register(req, res,next) {
        try {
            const { username, password } = req.body;
            const user = await this.registerUser.register(username,name, password);
            return user;
        } catch (error) {
            next(error);
        }
    }

    async login(req, res,next) {
        try {
            const { username, password } = req.body;
            const token = await this.loginUser.login(username, password);
            return token;
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res,next) {
        try {
            const { token } = req.body;
            const newToken = await this.refreshToken.refresh(token);
            return newToken;
        } catch (error) {
            next(error);
        }
    }
}