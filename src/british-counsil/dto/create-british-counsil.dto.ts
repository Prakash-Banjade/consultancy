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
    ielts_type: EIeltsType

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ph_no: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    ielts_booking_date: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    passprotAttatchment_id: string;
}
