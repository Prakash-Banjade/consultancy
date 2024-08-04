import { PartialType } from '@nestjs/swagger';
import { CreateLevelOfStudyDto } from './create-level-of-study.dto';

export class UpdateLevelOfStudyDto extends PartialType(CreateLevelOfStudyDto) {}
