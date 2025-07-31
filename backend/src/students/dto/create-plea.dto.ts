import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePleaDto {
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  justification: string;

  @IsString()
  @IsNotEmpty()
  offer: string;
}