class Photo{
    constructor({ id, title, description,  originalName, mimeType, urlimage, userId, width, height, albumId, createdAt, updatedAt }) {
        {
            this.id = id;
            this.title = title;
            this.description = description;
            this.originalName = originalName;
            this.urlimage = urlimage;
            this.userId = userId;
            this.width = width || null;
            this.height = height || null;
            this.albumId = albumId;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt || null;
        }
    }
}

module.exports = Photo;