import { Expose } from 'class-transformer';

export class PhotoDto {
  @Expose()
  id: string;

  @Expose()
  albumId: string;

  @Expose()
  userId: string;

  @Expose()
  publicId: string;

  @Expose()
  originalName: string;

  @Expose()
  mimeType: string;

  @Expose()
  sizeBytes: number;

  @Expose()
  width?: number | null;

  @Expose()
  height?: number | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date | null;
}