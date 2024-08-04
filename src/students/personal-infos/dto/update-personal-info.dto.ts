import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePersonalInfoDto } from './create-personal-info.dto';

export class UpdatePersonalInfoDto extends PartialType(OmitType(CreatePersonalInfoDto, ['studentId'] as const)) { }
