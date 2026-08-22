import bycrypt from "bcrypt";
import hashService from "../../domain/services/HashService.js";

class BcryptHashService extends hashService {
    hashPassword(password) {
        return bycrypt.hash(password, 10);
    }

    comparePassword(password, hashedPassword) {
        return bycrypt.compare(password, hashedPassword);
    }
}

module.exports = BcryptHashService;
