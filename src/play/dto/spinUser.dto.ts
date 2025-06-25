import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SpinUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
