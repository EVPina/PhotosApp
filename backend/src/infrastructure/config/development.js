module.exports = {
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    cloudinary: {
        cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
        cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
    },
    crosOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    isproduction: false
}