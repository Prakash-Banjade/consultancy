import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsHexColor, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @ApiPropertyOptional({ format: 'uuid' })
    @IsUUID()
    @IsOptional()
    logoId: string;

    @ApiPropertyOptional()
    @IsHexColor()
    @IsOptional()
    brandColorPrimary: string;

    @ApiPropertyOptional()
    @IsString()
    @IsHexColor()
    @IsOptional()
    brandColorSecondary: string;
}
