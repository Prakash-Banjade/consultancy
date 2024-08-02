import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { EIeltsType } from "src/core/types/global.types";

export class CreateBritishCounsilDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    dob: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EIeltsType)
    ieltsType: EIeltsType

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phNo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    ieltsBookingDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    passportAttatchmentId: string;
}
