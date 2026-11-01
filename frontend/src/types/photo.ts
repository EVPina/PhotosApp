export interface Photo {
  id: string;
  albumId: string;
  originalName: string;
  publicId: string;
  urlImage: string;
  mimeType: string;
  sizeBytes: number;
  width?: number | null;
  height?: number | null;
  createdAt: string;
  updatedAt?: string | null;
}