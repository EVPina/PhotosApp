import jwt from "jsonwebtoken";

export interface CloudinaryConfig {
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  cloudinaryFolder: string;
}

export interface AppConfig {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: jwt.SignOptions['expiresIn'];
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: jwt.SignOptions['expiresIn'];
  cloudinary: CloudinaryConfig;
  corsOrigin: string;
  isProduction: boolean;
}