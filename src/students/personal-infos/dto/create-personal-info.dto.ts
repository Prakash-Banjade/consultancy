import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/addresses/dto/create-address.dto";
import { ECountry } from "src/core/types/countries.type";
import { EGender, EMaritalStatus } from "src/core/types/global.types";

class VisaRefusalCountriesDto {
    @ApiProperty({ enum: ECountry })
    @IsEnum(ECountry)
    country: ECountry;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    visaType: string;
}

export class CreatePersonalInfoDto {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    studentId: string;

    /**
   |--------------------------------------------------
   | PERSONAL INFO
   |--------------------------------------------------
   */

    @ApiProperty({ format: 'date-time' })
    @IsNotEmpty()
    @IsDateString()
    dob: string;

    @ApiProperty({ enum: EGender })
    @IsNotEmpty()
    @IsEnum(EGender)
    gender: EGender

    @ApiProperty({ enum: EMaritalStatus })
    @IsNotEmpty()
    @IsEnum(EMaritalStatus)
    maritalStatus: EMaritalStatus

    /**
    |--------------------------------------------------
    | ADDRESS INFO
    |--------------------------------------------------
    */

    @ApiProperty({ type: CreateAddressDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsDefined()
    mailingAddress: CreateAddressDto

    @ApiProperty({ type: CreateAddressDto })
    @IsNotEmpty()
    @IsDefined()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    permanentAddress: CreateAddressDto

    /**
    |--------------------------------------------------
    | PASSPORT INFO
    |--------------------------------------------------
    */

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    passportNumber: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    passportIssueDate: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    passportExpiryDate: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    passportIssueCountry: ECountry

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cityOfBirth: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    countryOfBirth: ECountry;

    /**
    |--------------------------------------------------
    | NATIONALITY
    |--------------------------------------------------
    */

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    nationality: ECountry;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    citizenship: ECountry;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    livingAndStudyingCountry: ECountry

    @ApiProperty({ enum: ECountry, isArray: true })
    @IsEnum(ECountry, { each: true })
    otherCountrysCitizens: ECountry[]

    /**
    |--------------------------------------------------
    | BACKGROUND INFO
    |--------------------------------------------------
    */

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    appliedImmigrationCountry: ECountry

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    medicalCondition: string

    @ApiProperty({ type: [VisaRefusalCountriesDto], isArray: true })
    @ValidateNested({ each: true })
    @IsArray()
    @ArrayMinSize(1)
    @IsDefined()
    @Type(() => VisaRefusalCountriesDto)
    visaRefusalCountries: VisaRefusalCountriesDto[]; // format: [{country: ECountry, visaType: string}]

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    criminalRecord: string;

    /**
    |--------------------------------------------------
    | IMPORTANT CONTACTS
    |--------------------------------------------------
    */

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emergencyContactName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    emergencyContactPhoneNumber: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    emergencyContactEmail: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    relationWithApplicant: string;
}
