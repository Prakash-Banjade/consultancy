import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ECountry } from "src/core/types/countries.type";
import { EGender, EMaritalStatus } from "src/core/types/global.types";

export class CreateStudentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    middleName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty({ format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    dob: string;
}
