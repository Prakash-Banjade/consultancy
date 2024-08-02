import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUniversityDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comission: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    countryId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;
}
