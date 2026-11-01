export interface Album {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  folder: string;
  photoCount?: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateAlbumDto {
  title: string;
  description?: string;
}