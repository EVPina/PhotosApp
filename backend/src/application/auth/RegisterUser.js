class RegisterUser {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute({ email, name, password }) {
        const existingUser = await this.userRepository.findUserByEmail(email);
        if(existingUser) {
            throw new Error("El correo ya existe");
        }
        const passwordHash = await this.passwordHasher.hash(password);
       await this.userRepository.create({ email, name, password: passwordHash })
    }
}

module.exports = RegisterUser;