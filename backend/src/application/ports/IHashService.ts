export interface IHashService {
    HashPassword(password: string): Promise<string>
    ComparePassword(password: string, hashedPassword: string): Promise<boolean>
}
