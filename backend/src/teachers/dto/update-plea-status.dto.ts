import { IsEnum, IsNotEmpty } from 'class-validator';
import { PleaStatus } from '../../students/student-plea.entity';

export class UpdatePleaStatusDto {
  @IsEnum(PleaStatus)
  @IsNotEmpty()
  status: PleaStatus;
}