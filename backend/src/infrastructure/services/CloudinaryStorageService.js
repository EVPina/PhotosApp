import { cloudinary } from "cloudinary";
import config from "../config/development";

class CloudinaryStorageService extends StorageService {
    async uploadFile(file, options) {   
        const folder = config.cloudinary.cloudinaryFolder;
        const uploadOptions = { ...options, folder,resource_type: 'image' };
        const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) resolve({ error });
            else resolve({ result });
        });            
        stream.end(file);
    }
    async deleteFile(publicId) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
}

module.exports = CloudinaryStorageService;