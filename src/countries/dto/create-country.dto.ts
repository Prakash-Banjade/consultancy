import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCountryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    imageId: string;

    @ApiProperty({ type: [String], isArray: true })
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    states: string[]
}
