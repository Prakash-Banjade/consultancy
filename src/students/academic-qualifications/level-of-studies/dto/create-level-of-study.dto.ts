import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { ECountry } from "src/core/types/countries.type";
import { EGradingSystem, ELevelOfEducation } from "src/core/types/global.types";

export class CreateLevelOfStudyDto {
    @ApiProperty({ enum: ELevelOfEducation })
    @IsNotEmpty()
    @IsEnum(ELevelOfEducation)
    levelOfStudy: ELevelOfEducation;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nameOfBoard: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nameOfInstitution: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    countryOfStudy: ECountry

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stateOfStudy: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cityOfStudy: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    degreeAwarded: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EGradingSystem)
    gradingSystem: EGradingSystem;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    percentage: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    primaryLanguage: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    academicQualificationId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    studentId: string;
}
