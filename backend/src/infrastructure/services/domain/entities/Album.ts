interface AlbumProps{
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}


export class Album{
    readonly id;
    readonly title;
    readonly description;
    readonly userId;
    readonly createdAt;
    readonly updatedAt;

    constructor(props:AlbumProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.userId = props.userId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt||null;
    }

    CanCreatePhoto(currentPhotoCount:number):boolean {
        return currentPhotoCount < 20;
    }
}
