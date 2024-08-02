import { PartialType } from '@nestjs/swagger';
import { CreateBritishCounsilDto } from './create-british-counsil.dto';

export class UpdateBritishCounsilDto extends PartialType(CreateBritishCounsilDto) {}
