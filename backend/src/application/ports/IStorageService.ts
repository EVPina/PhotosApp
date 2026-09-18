export interface IStorageService {
    uploadFile(file: Buffer, options?: Record<string, any>): Promise<any>;
    deleteFile(publicId: string): Promise<any>;
}