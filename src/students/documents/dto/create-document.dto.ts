import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateDocumentDto {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    @IsNotEmpty()
    studentId: string;
    
    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    grade_ten_marksheetId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    grade_twelve_marksheetId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    passportId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    english_learning_certificateId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    grade_nine_marksheetId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    grade_eleven_marksheetId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    consent_formId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    ieltsId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    bankBalanceCertificateId: string;

    @ApiProperty({ format: 'uuid' })
    @IsNotEmpty()
    @IsUUID()
    financialAffidavitId: string;
}
