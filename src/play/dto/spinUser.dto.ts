import { IsNotEmpty, IsString } from 'class-validator';

export class SpinUserDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
