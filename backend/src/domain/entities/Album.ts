interface AlbumProps{
  id: string;
  title: string;
  description?: string | null;
  folder: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  photoCount?: number;
}


export class Album{
    readonly id;
    readonly title;
    readonly description;
    readonly folder;
    readonly userId;
    readonly createdAt;
    readonly updatedAt;
    readonly photoCount;

    constructor(props:AlbumProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description??null;
        this.folder = props.folder;
        this.userId = props.userId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt ?? null;
        this.photoCount = props.photoCount ?? 0;
    }

    canAddPhoto(currentPhotoCount:number):boolean {
        return currentPhotoCount < 20;
    }
}
