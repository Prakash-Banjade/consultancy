import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { EGender, EMaritalStatus } from "src/core/types/global.types";
import { File } from "src/files/entities/file.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Student extends BaseEntity {
    @Column({ type: 'varchar' })
    firstName: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'datetime' })
    dob: string;

    @Column({ type: 'varchar' })
    firstLanguage: string;

    @Column({ type: 'enum', enum: ECountry })
    countryOfCitizenship: ECountry;

    @Column({ type: 'varchar' })
    passportNumber: string;

    @Column({ type: 'datetime' })
    passportExpiry: string;

    @Column({ type: 'enum', enum: EGender })
    gender: EGender

    @Column({ type: 'enum', enum: EMaritalStatus })
    maritalStatus: EMaritalStatus

    @Column({ type: 'varchar' })
    phoneNumber: string;

    @Column({ type: 'int' })
    postalCode: number;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    emergencyContactName: string;

    @Column({ type: 'varchar' })
    emergencyContactNumber: string;

    @Column({ type: 'varchar' })
    emergencyContactEmail: string;

    /**
    |--------------------------------------------------
    | DOCUMENTS
    |--------------------------------------------------
    */

    @OneToOne(() => File)
    @JoinColumn()
    cv: File;

    @OneToOne(() => File)
    @JoinColumn()
    recommendationLetter: File;

    @OneToOne(() => File)
    @JoinColumn()
    experienceDoc: File;

    @OneToOne(() => File)
    @JoinColumn()
    passportDoc: File;

    @OneToOne(() => File)
    @JoinColumn()
    ieltsPteMarkDoc: File;

    @OneToOne(() => File)
    @JoinColumn()
    certificate_grade_10: File;

    @OneToOne(() => File)
    @JoinColumn()
    transcript_grade_10: File;

    @OneToOne(() => File)
    @JoinColumn()
    certificate_plus_two: File;

    @OneToOne(() => File)
    @JoinColumn()
    transcript_plus_two: File;

    @OneToOne(() => File)
    @JoinColumn()
    certificate_bachelor: File;

    @OneToOne(() => File)
    @JoinColumn()
    transcript_bachelor: File;
}
