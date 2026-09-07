import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  passwordHash: string;

  @Expose()
  name?: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt?: Date | null;
}

export class CreateUserDto{
   email: string;
   name: string;
  passwordHash: string;
}