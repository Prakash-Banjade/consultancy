import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ECountry } from "src/core/types/countries.type";

export class CreateCompanyBankingDetailDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    concerningPersonName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    vatNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    panNumber: number;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    panCertificateId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    benificiaryName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    accountNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankLocation: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ECountry)
    bankCountry: ECountry;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankState: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankCity: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    msmeRegNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    msmeRegDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    companyId: string;
}

export class UpdateCompanyBankingDetailDto extends PartialType(OmitType(CreateCompanyBankingDetailDto, ['companyId'] as const)) { }