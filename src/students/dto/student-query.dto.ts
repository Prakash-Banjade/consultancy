import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/core/dto/query.dto";

export class StudentQueryDto extends QueryDto {
    @ApiPropertyOptional({ format: 'date-time' })
    @IsString()
    @IsOptional()
    createdFrom: string;

    @ApiPropertyOptional({ format: 'date-time' })
    @IsString()
    @IsOptional()
    createdTo: string;

    @ApiPropertyOptional()
    @IsString()
    @Transform(({ value }) => value.split(','))
    @IsOptional()
    countryIds: string[]
}