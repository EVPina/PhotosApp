import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AppConfig, CloudinaryConfig } from './types';

dotenv.config();

export class Config_Development implements AppConfig {
  readonly port: number;
  readonly jwtSecret: string;
  readonly jwtExpiresIn: jwt.SignOptions['expiresIn'];
  readonly jwtRefreshSecret: string;
  readonly jwtRefreshExpiresIn: jwt.SignOptions['expiresIn'];
  readonly cloudinary: CloudinaryConfig;
  readonly corsOrigin: string;
  readonly isProduction: boolean;

  constructor() {
    this.port = parseInt(process.env.PORT || '3001', 10);
    this.jwtSecret = process.env.JWT_SECRET || 'secret';
    this.jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '15m') as jwt.SignOptions['expiresIn'];
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'secret';
    this.jwtRefreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN || '7m') as jwt.SignOptions['expiresIn'];
    this.cloudinary = {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'ads',
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || 'key',
      cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || 'secret',
      cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'PhotoApp',
    };
    this.corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
    this.isProduction = false;
  }
}

export default new Config_Development();