import { Expose } from 'class-transformer';

export class AlbumDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  name: string;

  @Expose()
  description?: string | null;

  @Expose()
  photoCount?: number;  // campo calculado, no viene de Prisma directamente

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date | null;
}

export interface CreateAlbumDto {
  userId: string;
  name: string;
  description?: string | null;
}

export interface UpdateAlbumDto {
  name?: string;
  description?: string | null;
}