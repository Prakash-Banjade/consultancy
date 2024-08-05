import { BaseEntity } from "src/core/entities/base.entity";
import { File } from "src/files/entities/file.entity";
import { Student } from "src/students/entities/student.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Document extends BaseEntity {
    @OneToOne(() => Student, (student) => student.document, { nullable: false })
    student: Student;

    @OneToOne(() => File)
    @JoinColumn()
    grade_ten_marksheet: File;

    @OneToOne(() => File)
    @JoinColumn()
    grade_twelve_marksheet: File;

    @OneToOne(() => File)
    @JoinColumn()
    passport: File;

    @OneToOne(() => File)
    @JoinColumn()
    english_learning_certificate: File;

    @OneToOne(() => File)
    @JoinColumn()
    grade_nine_marksheet: File;

    @OneToOne(() => File)
    @JoinColumn()
    grade_eleven_marksheet: File;

    @OneToOne(() => File)
    @JoinColumn()
    consent_form: File;

    @OneToOne(() => File)
    @JoinColumn()
    ielts: File;

    @OneToOne(() => File)
    @JoinColumn()
    bankBalanceCertificate: File;

    @OneToOne(() => File)
    @JoinColumn()
    financialAffidavit: File;
}
