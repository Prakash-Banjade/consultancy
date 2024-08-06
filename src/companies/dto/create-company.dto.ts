import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/addresses/dto/create-address.dto";
import { JoinColumn, OneToOne } from "typeorm";
import { CompanyBankingDetail } from "../entities/company-banking-detail.entity";
import { Type } from "class-transformer";

export class CreateCompanyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: CreateAddressDto })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsDefined()
    address: CreateAddressDto;
}
