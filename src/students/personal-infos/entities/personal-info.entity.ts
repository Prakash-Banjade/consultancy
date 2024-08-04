import { Address } from "src/addresses/entities/address.entity";
import { BaseEntity } from "src/core/entities/base.entity";
import { ECountry } from "src/core/types/countries.type";
import { EGender, EMaritalStatus } from "src/core/types/global.types";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class PersonalInfo extends BaseEntity {
    @OneToOne(() => Student, (student) => student.personalInfo)
    student: Student

    /**
    |--------------------------------------------------
    | PERSONAL INFO
    |--------------------------------------------------
    */

    @Column({ type: 'datetime' })
    dob: string;

    @Column({ type: 'enum', enum: EGender })
    gender: EGender

    @Column({ type: 'enum', enum: EMaritalStatus })
    maritalStatus: EMaritalStatus

    /**
    |--------------------------------------------------
    | ADDRESS INFO
    |--------------------------------------------------
    */

    @OneToOne(() => Address)
    @JoinColumn({ name: 'mailingAddressId' })
    mailingAddress: Address

    @OneToOne(() => Address)
    @JoinColumn({ name: 'permanentAddressId' })
    permanentAddress: Address

    /**
    |--------------------------------------------------
    | PASSPORT INFO
    |--------------------------------------------------
    */

    @Column({ type: 'varchar' })
    passportNumber: string

    @Column({ type: 'datetime' })
    passportIssueDate: string

    @Column({ type: 'datetime' })
    passportExpiryDate: string

    @Column({ type: 'enum', enum: ECountry, name: 'passportIssueCountry' })
    passportIssueCountry: ECountry

    @Column({ type: 'varchar' })
    cityOfBirth: string

    @Column({ type: 'enum', enum: ECountry })
    countryOfBirth: ECountry;

    /**
    |--------------------------------------------------
    | NATIONALITY
    |--------------------------------------------------
    */

    @Column({ type: 'enum', enum: ECountry })
    nationality: ECountry;

    @Column({ type: 'enum', enum: ECountry })
    citizenship: ECountry;

    @Column({ type: 'enum', enum: ECountry, name: 'livingAndStudyingCountry', nullable: true })
    livingAndStudyingCountry: ECountry

    @Column({ type: 'simple-array', nullable: true })
    otherCountrysCitizens: string[]

    /**
    |--------------------------------------------------
    | BACKGROUND INFO
    |--------------------------------------------------
    */

    @Column({ type: 'enum', enum: ECountry, name: 'appliedImmigrationCountry', nullable: true })
    appliedImmigrationCountry: ECountry

    @Column({ type: 'varchar', nullable: true })
    medicalCondition: string

    @Column({ type: 'varchar', nullable: true })
    visaRefusalCountries: string; // format: [{country: ECountry, visaType: string}]

    @Column({ type: 'varchar', nullable: true })
    criminalRecord: string;

    /**
    |--------------------------------------------------
    | IMPORTANT CONTACTS
    |--------------------------------------------------
    */

    @Column({ type: 'varchar' })
    emergencyContactName: string

    @Column({ type: 'varchar' })
    emergencyContactPhoneNumber: string

    @Column({ type: 'varchar' })
    emergencyContactEmail: string

    @Column({ type: 'varchar' })
    relationWithApplicant: string;
}
