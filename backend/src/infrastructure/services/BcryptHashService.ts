import bycrypt from "bcryptjs";
import { IHashService } from "../../application/ports/IHashService";

export class BcryptHashService implements IHashService {
    HashPassword(password: string): Promise<string> {
        return bycrypt.hash(password, 10);
    }

    ComparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bycrypt.compare(password, hashedPassword);
    }
}