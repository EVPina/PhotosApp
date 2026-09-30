import { Expose } from 'class-transformer';

export class AlbumDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  title: string;

  @Expose()
  description?: string | null;

  @Expose()
  folder: string; 

  @Expose()
  photoCount?: number;  // campo calculado, no viene de Prisma directamente

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date | null;
}

export interface CreateAlbumDto {
  userId: string;
  title: string;
  description?: string | null;
  folder: string;
}

export interface UpdateAlbumDto {
  title?: string;
  description?: string;
}