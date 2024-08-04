import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsUUID } from "class-validator";
import { EMonth } from "src/core/types/months.types";

export class CreateIntakeDto {
    @ApiProperty({ type: 'int' })
    @IsNotEmpty()
    @IsInt()
    year: number;

    @ApiProperty({ enum: EMonth })
    @IsEnum(EMonth)
    from: EMonth;

    @ApiProperty({ enum: EMonth })
    @IsEnum(EMonth)
    to: EMonth;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}

export class UpdateIntakeDto extends PartialType(OmitType(CreateIntakeDto, ['courseId'])) { }