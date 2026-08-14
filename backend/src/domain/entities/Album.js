class Album{
    constructor({ id, title, userId, createdAt, updatedAt }) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt||null;
    }

    CanCreatePhoto(currentPhotoCount) {
        return currentPhotoCount < 20;
    }
}

module.exports = Album;