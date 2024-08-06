import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export enum AssignableRoles {
    ADMIN = 'admin',
    USER = 'user',
}

export class RegisterDto {
    @ApiProperty({ type: 'string', description: 'First name of the user' })
    @IsString()
    @IsNotEmpty()
    @Length(2)
    firstName!: string;

    @ApiProperty({ type: 'string', description: 'Last name of the user' })
    @IsString()
    @Length(2)
    @IsOptional()
    lastName?: string;

    @ApiProperty({ type: 'string', format: 'email', description: 'Valid email' })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ type: 'string', description: 'Enter a strong password' })
    @IsString()
    @IsStrongPassword()
    password!: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    companyId: string;

    @ApiProperty({ enum: AssignableRoles })
    @IsEnum(AssignableRoles)
    @IsNotEmpty()
    role: AssignableRoles
}