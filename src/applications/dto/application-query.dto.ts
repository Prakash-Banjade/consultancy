import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/core/dto/query.dto";
import { ECountry } from "src/core/types/countries.type";
import { EApplicationStatus } from "src/core/types/global.types";
import { EMonth } from "src/core/types/months.types";

export class ApplicationQueryDto extends QueryDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    createdAt: string;

    @ApiPropertyOptional({ enum: ECountry })
    @IsString()
    @IsOptional()
    country: string;

    @ApiPropertyOptional({ format: 'uuid' })
    @IsString()
    @IsOptional()
    universityId: string;

    @ApiPropertyOptional({ enum: EMonth })
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.split(',')) // format: 'january,february,march'
    intakeMonths: string[];

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Transform(({ value }) => {
        const yearArr = value?.split(',')?.map((year: string) => isNaN(Number(year)) ? null : Number(year))?.filter(Boolean);
        return (Array.isArray(yearArr) && yearArr.length > 0) ? yearArr : [];
    })
    intakeYears: number[]

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.split(','))
    statuses: EApplicationStatus[];

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    courseName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    studentName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    ackNo: string;
}