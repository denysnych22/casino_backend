import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addUserPointsDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
  @IsNumber()
  @IsNotEmpty()
  points_to_add: number;
}