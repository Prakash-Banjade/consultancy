import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ECountry } from "src/core/types/countries.type";
import { EGender, EMaritalStatus } from "src/core/types/global.types";

export class CreateStudentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

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
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstLanguage: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    countryOfCitizenship: ECountry;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passportNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    passportExpiry: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EGender)
    gender: EGender

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EMaritalStatus)
    maritalStatus: EMaritalStatus

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    postalCode: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emergencyContactName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emergencyContactNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    emergencyContactEmail: string;

    /**
    |--------------------------------------------------
    | DOCUMENTS
    |--------------------------------------------------
    */

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    cvId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    recommendationLetterId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    experienceDocId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    passportDocId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    ieltsPteMarkDocId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    certificate_grade_10_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    transcript_grade_10_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    certificate_plus_two_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    transcript_plus_two_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    certificate_bachelor_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    transcript_bachelor_id: string;
}
