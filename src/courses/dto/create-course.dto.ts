import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    universityId: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    fee: number;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    applicationFee: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    priceUnit: string;

    @ApiProperty({ type: [String], isArray: true })
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    comissions: string[]
    // eg: [1 to 5 Students: 12%, 6 to 15 Students:15.5 %, Above 15 Students: 19%]

    @ApiProperty({ type: [String], isArray: true })
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    subjectRequirements: string[]

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ieltsScore: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pteScore: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsNumber()
    gapAccepted: number; // years

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    courseUrl: string;

    @ApiProperty({ type: [String], isArray: true })
    @IsNotEmpty({ each: true })
    @IsString({ each: true })
    paymentTerms: string[]

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    duration: string;
}
