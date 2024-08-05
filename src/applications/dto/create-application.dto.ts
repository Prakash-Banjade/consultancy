import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { IsFutureMonth } from "src/core/decorators/isFutureMonth.decorator";
import { IsFutureYear } from "src/core/decorators/validateYear.decorator";
import { EMonth } from "src/core/types/months.types";

export class CreateApplicationDto {
    @ApiProperty({ type: 'int' })
    @IsNotEmpty()
    @IsFutureYear()
    year: number;

    @ApiProperty({ enum: EMonth })
    @IsEnum(EMonth)
    @IsFutureMonth()
    month: EMonth;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    studentId: string;
}
