interface PhotoProps{
  id: string;
  title: string;
  description: string;
  originalName: string;
  urlimage: string;
  userId: string;
  width?: string;
  height?: string;
  albumId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Photo{
    readonly id;
    readonly title;
    readonly description;
    readonly originalName;
    readonly urlimage;
    readonly albumId;
    readonly width;
    readonly height;
    readonly createdAt;
    readonly updatedAt;

    constructor(props:PhotoProps) {
        {
            this.id = props.id;
            this.title = props.title;
            this.description = props.description;
            this.originalName = props.originalName;
            this.urlimage = props.urlimage;
            this.width = props.width;
            this.height = props.height;
            this.albumId = props.albumId;
            this.createdAt = props.createdAt;
            this.updatedAt = props.updatedAt;
        }
    }
}