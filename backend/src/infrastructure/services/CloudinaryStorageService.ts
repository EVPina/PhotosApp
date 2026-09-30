import { IStorageService } from "../../application/ports/IStorageService";
import config from "../config/development";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryCloudName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret,
});

export class CloudinaryStorageService implements IStorageService {

    async uploadFile(file: Buffer, options: Record<string, any> = {}): Promise<any> {   
        return new Promise((resolve, reject) => {
            const folder = options.folder || config.cloudinary.cloudinaryFolder;
            const uploadOptions = {
                folder,
                resource_type: 'image' as const, // Tipo literal
                ...options,
            };
            const stream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                if (error) reject(error);
                else resolve(result);
                }
            );
            stream.end(file);
        });  
    }

    async deleteFile(publicId: string) {
        return cloudinary.uploader.destroy(publicId);
    }

    async createFolderIfNotExists(path: string): Promise<void> {
    try {
      await cloudinary.api.create_folder(path);
    } catch (error: any) {
      // Cloudinary lanza http_code 409 si la carpeta ya existe
      if (error?.http_code === 409) {
        return;
      }
      throw error;
    }
  }
}
