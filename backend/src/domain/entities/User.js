class User {
  constructor({ id, email, name, passwordHash, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.name = name || null;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt || null;
  }

  CanCreateAlbum(currentAlbumCount) {
    return currentAlbumCount < 5;
  }
}
module.exports = User;