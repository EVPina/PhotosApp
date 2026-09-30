export class AlbumTitleAlreadyExistsError extends Error {
  constructor(message = 'Ya existe un álbum con ese título') {
    super(message);
    this.name = 'AlbumTitleAlreadyExistsError';
  }
}