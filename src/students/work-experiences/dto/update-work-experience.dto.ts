import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateWorkExperienceDto } from './create-work-experience.dto';

export class UpdateWorkExperienceDto extends PartialType(OmitType(CreateWorkExperienceDto, ['studentId'] as const)) { }
