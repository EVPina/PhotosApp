class LoginUser{
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    async execute({ email, password }) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const isMatch = await this.hashService.comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }
        const token = await this.tokenService.generateToken(user);
        const reshetoken = await this.tokenService.refreshToken(user);
        return { user: { id: user.id, email: user.email, createdAt: user.createdAt }, token, reshetoken };
    }
}
module.exports = LoginUser;