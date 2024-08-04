import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ECountry } from "src/core/types/countries.type";

export class CreateAddressDto {
    @ApiProperty({ type: String, description: 'Address 1' })
    @IsString()
    @IsNotEmpty()
    address1!: string;

    @ApiPropertyOptional({ type: String, description: 'Address 2' })
    @IsString()
    @IsOptional()
    address2?: string;

    @ApiProperty({ type: String, description: 'City' })
    @IsString()
    @IsNotEmpty()
    city!: string;

    @ApiProperty({ type: 'enum', enum: ECountry, description: 'Country' })
    @IsEnum(ECountry)
    country!: ECountry;

    @ApiProperty({ type: String, description: 'State' })
    @IsString()
    @IsNotEmpty()
    state!: string;

    @ApiProperty({ type: String, description: 'Zip Code' })
    @IsInt()
    @IsNotEmpty()
    zipCode!: number;
}
