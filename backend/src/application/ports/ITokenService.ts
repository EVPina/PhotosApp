export interface ITokenService {
    generateToken(payload : object) : String
    refreshToken(payload: object) : String
    verifyToken(token:string): string | object
    verifyRefreshToken(token:string) : string | object  
}
