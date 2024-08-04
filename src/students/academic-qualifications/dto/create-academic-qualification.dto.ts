import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ECountry } from "src/core/types/countries.type";
import { ELevelOfEducation } from "src/core/types/global.types";

export class CreateAcademicQualificationDto {
    @ApiProperty({ enum: ECountry })
    @IsEnum(ECountry)
    countryOfEducation: ECountry;

    @ApiProperty({ enum: ELevelOfEducation })
    @IsEnum(ELevelOfEducation)
    highestLevelOfEducation: ELevelOfEducation;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    studentId: string;
}

