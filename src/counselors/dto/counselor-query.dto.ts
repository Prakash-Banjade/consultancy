import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/core/dto/query.dto";

export class CounselorQueryDto extends QueryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    email: string;
}