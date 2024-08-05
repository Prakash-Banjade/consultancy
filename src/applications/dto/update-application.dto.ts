import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { EApplicationPriority, EApplicationStatus } from 'src/core/types/global.types';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateApplicationDto extends PartialType(OmitType(CreateApplicationDto, ['studentId', 'courseId'] as const)) {
    @ApiPropertyOptional({ enum: EApplicationPriority })
    @IsEnum(EApplicationPriority)
    @IsOptional()
    priority: EApplicationPriority;

    @ApiPropertyOptional({ enum: EApplicationStatus })
    @IsEnum(EApplicationStatus)
    @IsOptional()
    status: EApplicationStatus;
}
