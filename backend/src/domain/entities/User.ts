interface UserProps {
  id: string;
  email: string;
  name?: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User {

  readonly id: string;
  readonly email: string;
  readonly name?: string;
  readonly passwordHash: string;
  readonly createdAt: Date;
  readonly updatedAt?: Date;

  constructor(props:UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  CanCreateAlbum(currentAlbumCount:number) : boolean {
    return currentAlbumCount < 5;
  }
}