import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID, ValidateIf } from "class-validator";
import { EModeOfSalary } from "src/core/types/global.types";

export class CreateWorkExperienceDto {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    studentId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nameOfOrganization: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    position: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    jobProfile: string;

    @ApiProperty({ format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    workingFrom: string;

    @ApiProperty({ format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    @ValidateIf((o) => !o.currentlyWorking)
    workingUpto: string;

    @ApiProperty({ enum: EModeOfSalary })
    @IsNotEmpty()
    @IsEnum(EModeOfSalary)
    modeOfSalary: EModeOfSalary;

    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    @IsBoolean()
    currentlyWorking: boolean;
}
